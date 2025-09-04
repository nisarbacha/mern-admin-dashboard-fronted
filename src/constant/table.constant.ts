export const VIRTUAL_HEIGHT = '60vh'

const PageSizeOptions = {
    small: ['10', '20', '50'],
    default: ['20', '50', '100'],
    medium: ['20', '50', '100', '200'],
    large: ['20', '50', '100', '200', '300', '400', '500'],
}
export { PageSizeOptions }

export const SUPPORTED_CONDITIONS = {
    equals: '$eq',
    notEquals: '$ne',
    includes: '$contL',
    excludes: '$exclL',
    starts: '$starts',
    ends: '$ends',
    greater: '$gt',
    greaterEqual: '$gte',
    lesser: '$lt',
    lesserEqual: '$lte',
    between: 'between',
    in: '$in',
    notIn: '$notin',
    null: '$isnull',
    notNull: '$notnull',
} as const;

export type TSupportedConditions = (typeof SUPPORTED_CONDITIONS)[keyof typeof SUPPORTED_CONDITIONS];

export const MULTI_SELECT_OPTIONS = [
    { label: 'In', value: SUPPORTED_CONDITIONS.in },
    { label: 'Not Null', value: SUPPORTED_CONDITIONS.notNull },
    { label: 'Null', value: SUPPORTED_CONDITIONS.null },
];
export const SINGLE_SELECT_OPTIONS = [
    { label: 'Equals', value: SUPPORTED_CONDITIONS.equals },
    { label: 'Not Equals', value: SUPPORTED_CONDITIONS.notEquals },
 
];
export const STRING_OPTIONS = [
    { label: 'Includes', value: SUPPORTED_CONDITIONS.includes },
    { label: 'Excludes', value: SUPPORTED_CONDITIONS.excludes },
    { label: 'Equals', value: SUPPORTED_CONDITIONS.equals },
    { label: 'Not Equals', value: SUPPORTED_CONDITIONS.notEquals },
    { label: 'Starts With', value: SUPPORTED_CONDITIONS.starts },
    { label: 'Ends With', value: SUPPORTED_CONDITIONS.ends },
];

export const NUMBER_OPTIONS = [
    { label: 'Equals', value: SUPPORTED_CONDITIONS.equals },
    { label: 'Not Equals', value: SUPPORTED_CONDITIONS.notEquals },
    { label: 'Greater Than', value: SUPPORTED_CONDITIONS.greater },
    { label: 'Greater Than or Equal', value: SUPPORTED_CONDITIONS.greaterEqual },
    { label: 'Less Than', value: SUPPORTED_CONDITIONS.lesser },
    { label: 'Less Than or Equal', value: SUPPORTED_CONDITIONS.lesserEqual },
];

export const SINGLE_DATE_OPTIONS = [
    { label: 'Between', value: SUPPORTED_CONDITIONS.between },
    { label: 'After', value: SUPPORTED_CONDITIONS.greater },
    { label: 'Before', value: SUPPORTED_CONDITIONS.lesser },
];

export const SINGLE_TIME_OPTIONS = [
    { label: 'Equals', value: SUPPORTED_CONDITIONS.equals },
    { label: 'After', value: SUPPORTED_CONDITIONS.greater },
    { label: 'Before', value: SUPPORTED_CONDITIONS.lesser },
];

export const SINGLE_DATE_OPTIONS_USER = [
    { label: 'Between', value: SUPPORTED_CONDITIONS.between },
    { label: 'Multiple Days', value: SUPPORTED_CONDITIONS.in },
    { label: 'After', value: SUPPORTED_CONDITIONS.greater },
    { label: 'Before', value: SUPPORTED_CONDITIONS.lesser },
];

export const RANGE_DATE_OPTIONS = [
    { label: 'Between', value: SUPPORTED_CONDITIONS.between },
    { label: 'Not Between', value: SUPPORTED_CONDITIONS.notIn },
];

export const IS_NULL_OPTIONS = [
    { label: 'Is Not Null', value: SUPPORTED_CONDITIONS.notNull },
    { label: 'Is Null', value: SUPPORTED_CONDITIONS.null },
];

export const YES_NO_OPTIONS = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
];

export const YES_NO_OPTIONS_REVERSED = [
    { label: 'Yes', value: false },
    { label: 'No', value: true },
];

// export const BASE_TABLE_STATE = {
//     page: 1,
//     pageSize: 100,
//     density: 'small', //fix this as SizeType,
//     selectedRows: [] as string[],
//     filters: [] as IFilter[],
//     sort: {
//         field: 'createdAt',
//         order: SortDirection.DESC,
//     },
//     updateVisibility: false,
//     createVisibility: false,
//     viewVisibility: false,
// }

// type TTableScrolls = Partial<
//     Record<
//         keyof typeof PageIdsLocalStorage,
//         {
//             x?: string | number | true | undefined
//             y?: string | number | undefined
//         }
//     >
// >
// export const TABLE_SCROLLS: TTableScrolls = {
//     transactionsTableId: { y: 'calc(100vh - 415px)', x: 'max-content' },
//     brandConfigs: { y: 'calc(100vh - 320px)', x: true },
//     ExcludesSymbols: { x: 'max-content', y: 'calc(100vh - 450px)' },
// } as const

export const ROW_META = {
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy',
    deletedAt: 'deletedAt',
    deletedBy: 'deletedBy',
} as const
