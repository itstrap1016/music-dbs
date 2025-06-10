export interface SearchIF {
  name: string;
  artist?: string;
  url: string;
  listeners?: string;
  image?: { "#text": string; size: string }[];
  mbid: string;
  streamable: string;
}

// track.search 결과의 트랙 타입
// export interface TrackSearchIF {
//   name: string;
//   artist: string;
//   url: string;
//   listeners?: string;
//   image?: { "#text": string; size: string }[];
//   mbid: string;
//   streamable: string;
// }

// album.search 결과의 앨범 타입
// export interface AlbumSearchIF {
//   name: string;
//   artist: string;
//   url: string;
//   image?: { "#text": string; size: string }[];
//   mbid: string;
//   streamable: string;
// }

// artist.search 결과의 아티스트 타입
// export interface ArtistSearchIF {
//   name: string;
//   url: string;
//   listeners?: string;
//   image?: { "#text": string; size: string }[];
//   mbid: string;
//   streamable: string;
// }
