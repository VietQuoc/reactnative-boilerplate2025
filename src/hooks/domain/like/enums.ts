export enum LikeTypes {
  Like = 'Like',
  Love = 'Love',
  Haha = 'Haha',
  Wow = 'Wow',
  Sad = 'Sad',
  Angry = 'Angry',
  Handshake = 'Handshake',
}
export enum LikeIcons {
  Like = 'thumbs-up',
  Love = 'heart',
  Haha = 'face-grin-squint-tears',
  Wow = 'face-surprise',
  Sad = 'face-frown',
  Angry = 'face-angry',
  Handshake = 'hand-peace',
}

export const likeTypeToIconMap: Record<any, string> = {
  [LikeTypes.Like]: LikeIcons.Like,
  [LikeTypes.Love]: LikeIcons.Love,
  [LikeTypes.Haha]: LikeIcons.Haha,
  [LikeTypes.Wow]: LikeIcons.Wow,
  [LikeTypes.Sad]: LikeIcons.Sad,
  [LikeTypes.Angry]: LikeIcons.Angry,
  [LikeTypes.Handshake]: LikeIcons.Handshake,
};
