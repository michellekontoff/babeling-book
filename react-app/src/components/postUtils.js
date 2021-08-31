export async function getLanguages(cb) {
    const res = await fetch('/api/languages')

    if (res.ok) {
        const list = await res.json()
        cb(list.languages)

    } else {
        return 'Something went wrong.'
    }
}
