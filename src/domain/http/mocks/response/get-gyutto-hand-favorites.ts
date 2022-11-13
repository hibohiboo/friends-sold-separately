const fav = [
  {
    id: '420611df-7a70-4b65-918c-e3f335b413e2_620b45ea-9bc3-49f2-bd64-ec73700d647d',
    friendIdentifier: '420611df-7a70-4b65-918c-e3f335b413e2',
    friendName: 'ななしのTRPG民',
    friendTwitterId: '',
    attributeId: '1620b45ea-9bc3-49f2-bd64-ec73700d647d',
    attributeType: 'Like',
    attributeName: '高森藍子',
    createdAt: 1667860408801,
  },
  {
    id: '420611df-7a70-4b65-918c-e3f335b413e2_28f90965-2c04-45b7-ba7e-b8bde56ddbb2',
    friendIdentifier: '420611df-7a70-4b65-918c-e3f335b413e2',
    friendName: 'ななしのTRPG民',
    friendTwitterId: '',
    attributeId: '228f90965-2c04-45b7-ba7e-b8bde56ddbb2',
    attributeType: 'Rulebook',
    attributeName: 'ケダモノオペラ',
    createdAt: 1667860408156,
  },
];

const res = {
  Count: 1,
  Items: [{ json: { S: JSON.stringify(fav) } }],
  ScannedCount: 1,
};
export default res;
