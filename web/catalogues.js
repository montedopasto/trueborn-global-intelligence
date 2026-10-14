// Product references transcribed from the user-provided catalogues.
// Full PDFs, local storage paths and private commercial analysis are not published.
export const CATALOGUES = [
 {id:'C1',filename:'The Chef Solutions_True Born_2025.pdf.pdf',pages:3,sha256:'7fb77773b6c24284aa17ded652ba119dac0d43f8026b2e52a5267419b4d849ee',checkedAt:'2026-10-14',scopePages:[1],excludedPages:[2,3]},
 {id:'C2',filename:'The Savoury Cuts_True Born_2025.pdf.pdf',pages:5,sha256:'f3cf4e69c8167af5d198ca2956378c8b122ee12aa8d8b3ca67968e2e1f1fd743',checkedAt:'2026-10-14',scopePages:[1,2],excludedPages:[3,4,5]}
];
const missing=['Preços e condições comerciais','Pesos, dimensões e códigos de artigo','Ingredientes completos e alergénios','Certificações e elegibilidade de exportação','Códigos pautais por produto'];
export const STORAGE_ASSUMPTION = {state:'Congelado',source:'Indicação do utilizador em 14/10/2026',scope:['chef','savoury','charcuterie']};
export const PRODUCT_PROFILES = {
 chef:{source:'C1',page:1,heading:'Beef · The Chef Solutions',channels:[],
  products:['Sirloin Cap','Acém','Tip of the Sirloin','Sirloin','Filé Mignon','Rump','Rump Steak','Beef Rump',"Cow’s Brisket",'Rib Fillet','Palette','Top Round','Patinho','Shoulder or Palette','Palette Racket','Back Muscle','Fraldinha ou Aba',"Cow’s Belly",'Front Muscle','Lagarto','Soft Muscle'],
  note:'Nomes transcritos das legendas. “Top Round” aparece em duas posições; “Palette” e “Shoulder or Palette” foram preservados sem resolver possíveis equivalências. A lista não representa uma contagem de artigos comerciais.',
  claims:['O catálogo declara animais nascidos em Portugal e criados no Alentejo.','O catálogo declara alimentação adaptada e práticas de bem-estar animal.'],
  presentation:'Imagens de cortes embalados. O selo “Frozen is the true freshness” está visível; não fornece temperatura nem prazo de conservação.',
  missing},
 savoury:{source:'C2',page:1,heading:'Beef · The Savoury Cuts',channels:[],
  products:['Filet Mignon','Ribeye Steak','New York Steak','Rump Steak','Ranch Steak','Petite Chuck Steak','Picanha Steak','Beefs Cubes','Strogonoff','Burguer Gourmet','Mini Beefburger','Finest Minced Beef','Chuleton','Tomahawk','T-Bone'],
  note:'Nomes conferidos visualmente nas embalagens, mantendo a grafia do documento, incluindo “Beefs Cubes” e “Burguer Gourmet”. A apresentação não informa códigos de artigo nem formatos técnicos completos.',
  claims:['O catálogo declara criação de bovinos ao ar livre no Alentejo e práticas de bem-estar animal.'],
  presentation:'Doze apresentações em bandeja e três cortes com os nomes Chuleton, Tomahawk e T-Bone. O selo “Frozen is the true freshness” está visível; não substitui a ficha técnica.',
  missing},
 charcuterie:{source:'C2',page:2,heading:'Charcuterie · Collection',channels:['Food Service','Retail'],
  products:['Chouriço','Linguiça delgada','Salsichão','Salsichão delgado','Paio'],
  note:'Cinco nomes apresentados em Food Service e em Retail. As embalagens identificam “Bovino”; a página não permite concluir a percentagem de carne bovina, todos os ingredientes ou o material da tripa.',
  claims:['A página apresenta a gama como charcutaria de bovino.','O catálogo declara animais nascidos em Portugal, criados no Alentejo, alimentação adaptada e práticas de bem-estar animal.'],
  presentation:'Duas apresentações comerciais por nome: Food Service e Retail. Não há pesos ou códigos de artigo legíveis que permitam definir os formatos técnicos.',
  missing}
};
