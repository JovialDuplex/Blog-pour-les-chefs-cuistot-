// comparaison de deux objets

const object1 = {
    article_title : "Article 1",
    article_descrip : "Description Article 1",
    article_content : "Contenu de l'article 1",
    article_category : 2
};

const object2 = {
    article_title : "Article 2",
    article_descrip : "Description Article 1",
    article_content : "Contenu de l'article 1",
    article_category : 3  
};

Object.keys(object1).forEach(key => {
    if(object1[key] != object2[key]) {
        console.log("une difference trouvee");
        console.log("la cle concerne est : ", key);
    }
});
