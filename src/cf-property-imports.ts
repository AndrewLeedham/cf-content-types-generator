import {Field} from 'contentful';
import {ImportDeclarationStructure, OptionalKind} from 'ts-morph';
import {linkContentTypeValidations, moduleName} from './utils';

const moduleImport = (module: string) => ({
    moduleSpecifier: `./${moduleName(module)}`,
    namedImports: [
        moduleName(module),
    ],
});

export const propertyImports = (field: Field, ignoreModule?: string): OptionalKind<ImportDeclarationStructure>[] => {
    const filterIgnoredModule = (name: string) => ignoreModule !== moduleName(name);

    if (field.type === 'Link' && field.linkType === 'Entry') {
        return field.validations?.length > 0 ? linkContentTypeValidations(field)
            .filter(filterIgnoredModule)
            .map(moduleImport) : [{moduleSpecifier: './index', namedImports: ['CMSEntries']}];
    }
    if (field.type === 'Array' && field.items) {
        return field.items?.validations?.length > 0 ? linkContentTypeValidations(field.items)
            .filter(filterIgnoredModule)
            .map(moduleImport) : [{moduleSpecifier: './index', namedImports: ['CMSEntries']}];
    }
    return [];
};
