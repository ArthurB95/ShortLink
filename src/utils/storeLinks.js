import AsyncStorage from "@react-native-async-storage/async-storage";

//BUSCAR OS LINKS SALVOS
export async function getLinksSave(key) {
  const myLinks = await AsyncStorage.getItem(key);

  let linkSaves = JSON.parse(myLinks) || [];

  return linkSaves;
}

//SALVAR UM LINK NO STORAGE
export async function saveLink(key, newLink) {
  let linksStored = await getLinksSave(key);

  //SE TIVER ALGUM LINK SAVO COM ESSE MESMO ID / OU DUPLICADO PRECISO IGNORAR.
  const hasLink = linksStored.some(link => link.id === newLink.id);

  if(hasLink) {
    console.log('ESSE LINK JÁ EXISTE NA LISTA.');

    return; 
  }

  linksStored.push(newLink);

  await AsyncStorage.setItem(key, JSON.stringify(linksStored))
  console.log('LINK SALVO COM SUCESSO!')
}

//DELETAR ALGUM LINK ESPECÍFICO
export async function deleteLink(links, id) {
  let myLinks = links.filter((item) => {
    return (item.id !== id)
  })

  await AsyncStorage.setItem('ShortLinks', JSON.stringify(myLinks))

  console.log('LINK DELETADO DO STORAGE')

  return myLinks;
}
