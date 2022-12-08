export type GalleryItem = {
  name: string;
  text: string;
  imageUrl: string;
  sheetUrl: string;
  illustCreator: string;
  illustCreatorUrl: string;
};

type Name = string;
type Text = string;
type ImageUrl = string;
type SheetUrl = string;
type IllustCreator = string;
type IllustCreatorUrl = string;

type GalleryItemSpreadSheetColumns = [
  Name,
  Text,
  ImageUrl,
  SheetUrl,
  IllustCreator,
  IllustCreatorUrl
];
type UserName = string;
type GalleryItemSpreadSheetFirstColumns = [
  string, // NameLabel
  UserName // userName
];
export type GalleryItemSpreadSheet = [
  GalleryItemSpreadSheetFirstColumns,
  [],
  [],
  GalleryItemSpreadSheetColumns
];
