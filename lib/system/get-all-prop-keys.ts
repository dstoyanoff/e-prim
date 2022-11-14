export const getAllPropKeys = <TObject>(map: Record<keyof TObject, true>) => Object.keys(map) as (keyof TObject)[];
