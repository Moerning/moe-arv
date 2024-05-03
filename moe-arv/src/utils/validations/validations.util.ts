export const required = (value: any, name: string) => {
    const requiredMessage = `${name ? name : 'This field'} is required`
    if (value === undefined || value === null) return requiredMessage
    if (!String(value).length) return requiredMessage

    return true
}
