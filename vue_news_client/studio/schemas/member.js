export default {
    title: 'Member',
    name: 'member',
    type: 'document',
    fields: [
        {
            title: 'Username',
            name: 'username',
            type: 'string',
            validation: Rule => Rule.required().error('Please provide a username')
        },
        {
            title: 'Council Member',
            name: 'council_member',
            type: 'boolean'
        },
        {
            title: 'Bio',
            name: 'bio',
            type: 'text',
            validation: Rule => [
                Rule.max(640).error('Announcement Summary must be less than 640 characters'),
            ]
        },
        {
            title: 'Profile Picture',
            name: 'profile_picture',
            type: 'image'
        }
    ]

}