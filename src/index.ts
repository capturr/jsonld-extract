/*----------------------------------
- DEPENDANCES
----------------------------------*/



/*----------------------------------
- TYPES
----------------------------------*/

export type TJsonldReader = (path: any) => any

type TOptions = {
    debug?: boolean,
    basePath?: string
}

type TJqueryAPI = (selector: string) => {
    toArray: () => any[],
    contents: () => {
        text: () => string
    }
}

/*----------------------------------
- METHODES
----------------------------------*/
export const getDefinitions = ($: TJqueryAPI, debug: boolean = false): any[] => {

    let definitions: any[] = [];
    const rawDefinitions = $('script[type="application/ld+json"]').toArray();
    for (const rawDefinition of rawDefinitions) {
        const raw = $(rawDefinition).contents().text().trim();
        try {

            const definition = JSON.parse(raw);
            if (Array.isArray(definition))
                definitions.push(...definition);
            else if (typeof definition === "object")
                definitions.push(definition);

        } catch (e) {
            debug && console.warn(`[scraper][jsonld] Erreur parsing json`, e);
            continue;
        }
    }

    debug && console.log(`[scraper][jsonld] Définitions:`, definitions);

    return definitions;
}

export const extractData = (path: string, definitions: any[], debug: boolean = false): any => {

    // Extraction branches
    const [type, ...branches] = path.split('.');

    debug && console.log(`[scraper][jsonld] Extraction de:`, type, branches);

    // Recherche dans chaque bloc de définition
    itDefinitions:
    for (const definition of definitions) {

        if (definition['@type']?.toLowerCase() !== type)
            continue;

        debug && console.log(`[scraper][jsonld] ${type} Trouvé`, definition);

        // Extraction valeur
        let valeur: any = definition;
        for (const branche of branches) {

            // Impossible d'itérer jusqu'au bout = définition exclue
            if (typeof valeur !== 'object')
                break itDefinitions;

            valeur = valeur[branche];
        }

        debug && console.log(`[scraper][jsonld] Valeur trouvée:`, valeur);

        // Retour si non-nulle
        if (valeur !== undefined && valeur !== null)
            return valeur;

    };

    // Pas trouvé, retourne undefined
    return undefined;

}

export default ($: TJqueryAPI, { debug, basePath }: TOptions = {}): TJsonldReader => {

    const definitions = getDefinitions($, debug);

    return (path: string) => extractData(
        (basePath === undefined ? '' : basePath + '.') + path,
        definitions, 
        debug
    );
}