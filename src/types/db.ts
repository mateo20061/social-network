import { inferQueryOutput } from 'src/utils/trpc';

export type PostDetailsType = inferQueryOutput<'post.getById'>;

export type UserDetailsType = inferQueryOutput<'user.getById'>;

export type CommentDetailsType = inferQueryOutput<'comment.getAllByPostId'>[0];

export type SharedPostType = NonNullable<PostDetailsType['shareParent']>;

export type CommunityDetailsType = inferQueryOutput<'community.getById'>;

export type SearchEntryType = inferQueryOutput<'search.getBySearchPhrase'>[0];

export type SearchUserType = inferQueryOutput<'user.getBySearchPhrase'>[0];

export type NotificationsType = inferQueryOutput<'notification.getAll'>;

export type NotificationMentionsType = inferQueryOutput<'notification.getAll'>['notificationsMentions'][0]

export type NotificationStartFollowType = inferQueryOutput<'notification.getAll'>['notificationsStartFollow'][0]
