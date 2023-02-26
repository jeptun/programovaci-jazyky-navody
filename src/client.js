import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "0qhx0jng",
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: true
})