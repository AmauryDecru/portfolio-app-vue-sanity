export default {
    title: 'Announcement',
    name: 'announcement',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => [
                Rule.required().min(5).error("Title must be at least 5 characters long"),
                Rule.required().max(50).warning("Shorter title is suggested")
            ]
        },
        {
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{type: 'member'}],
            validation: Rule => Rule.required().error('Author is required')
        },
        {
            title: 'Summary',
            name: 'summary',
            type: 'text',
            validation: Rule => [
                Rule.max(180).error('Announcement Summary must be less than 180 characters'),
            ]
        },
        {
            title: 'Content',
            name: 'content',
            type: 'text',
            validation: Rule => Rule.required().error('Content is required')
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image'
        }
    ]
}