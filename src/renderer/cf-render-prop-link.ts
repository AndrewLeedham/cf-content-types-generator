import {Field} from 'contentful';
import {linkContentTypeValidations, moduleName} from '../utils';
import {renderUnionType} from './render-union-type';

const linkContentType = (field: Pick<Field, 'id' | 'validations'>): string => {
    const validations = linkContentTypeValidations(field);
    return validations?.length > 0 ? renderUnionType(validations.map(moduleName)) : 'CMSEntry<string, Record<string, any>>';
};

export const renderPropLink = (field: Pick<Field, 'id' | 'validations' | 'linkType'>) => {
    return field.linkType === 'Entry'
        ? linkContentType(field)
        : 'Contentful.' + field.linkType!;
};
