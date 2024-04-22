**Full Stack Projektiraportti: T2 REST API**

# Sisällysluettelo {#sisällysluettelo .TOC-Heading}

[1 Yleistä tietoa projektista
[3](#yleistä-tietoa-projektista)](#yleistä-tietoa-projektista)

[2 Käytettyjä tekniikoita ja erikoisuuksia
[3](#käytettyjä-tekniikoita-ja-erikoisuuksia)](#käytettyjä-tekniikoita-ja-erikoisuuksia)

[3 Sivuston / ohjelmiston design ja rakenne
[4](#sivuston-ohjelmiston-design-ja-rakenne)](#sivuston-ohjelmiston-design-ja-rakenne)

[4 Oma arvio työstä ja oman osaamisen kehittymisestä
[5](#_Toc164690118)](#_Toc164690118)

[5 Palaute opettajalle kurssista sekä itse opetuksesta tähän saakka
[5](#_Toc164690119)](#_Toc164690119)

[6 Linkit [5](#linkit)](#linkit)

[6.1 Verkkosivuni osoite
[5](#verkkosivuni-osoite)](#verkkosivuni-osoite)

[6.2 Linkki GitHub repositorioon
[5](#linkki-github-repositorioon)](#linkki-github-repositorioon)

[6.3 Linkki projektin videoesitykseen
[5](#linkki-projektin-videoesitykseen)](#linkki-projektin-videoesitykseen)

# Yleistä tietoa projektista

Projektin tarkoitus on tarjota helposti lähestyttävä rajapinta erään
Discord-yhteisön tapahtumien (peli-illat, kisat) tallentamiseksi MongoDB
-tietokantaan. Näitä tietoja on myöhemmin tarkoitus manipuloida useita
reittejä pitkin muun muassa Discord-botilla, React-pohjaisella
web-käyttöliittymällä sekä Python -pohjaisilla automaatioilla, joten
REST API on järkeenkäypä valinta. API Sisältää yleisimmät CRUD-reitit
(Ks. Sivuston / ohjelmiston design ja rakenne) sisältäen myös
validointia, jolloin toiminnallisuudet ovat varsin riittävät.\
\
Dokumentit tallennetaan haluttuun dokumenttikokoelmaan seuraavanlaisessa
muodossa:\
\
{\
\"name\": \"Uusi tapahtuma\",\
\"date\": \"2022-12-31\",\
\"location\": \"Helsinki\",\
\"description\": \"Tämä on uusi tapahtuma\",\
\"published_until\": \"2022-12-30\"\
}

# Käytettyjä tekniikoita ja erikoisuuksia

Projektissa ei varsinaisesti ole alalta poikkeavia erikoisuuksia.
Kuitenkin virheilmoituksiin on panostettu ja käyttäjä ymmärtää melko
helposti annetun informaation pohjalta mahdolliset vikakohdat
pyynnössään. Projektissa on käytetty muun muassa seuraavia tekniikoita:

**Node.js**: JavaScriptin suoritusympäristö, joka mahdollistaa
JavaScriptin suorittamisen palvelimella.

**Express.js**: Nopea, avoimen lähdekoodin web-sovelluskehykset
Node.js:lle, jota käytetään reittien ja middlewaren määrittämiseen.

**MongoDB**: Dokumenttiorientoitunut tietokanta, jota käytetään tietojen
tallentamiseen.

**Mongoose**: Node.js -kirjasto joka tarjoaaa rajapinnan tietojen
hallintaan MongoDB-tietokannassa. Mongoose tarjoaa monia hyödyllisiä
ominaisuuksia, kuten validoinnin, elinkaaren käsittelyn,
kyselyrakentamisen ja paljon muuta. Valmiiden toiminnallisuuksien takia
Mongoose helpottaa MongoDB-tietokantojen hallintaa ja käsittelyä
merkittävästi.

# Sivuston / ohjelmiston design ja rakenne

API:lla ei ole varsinaista käyttöliittymää. Kuitenkin joku saattaa eksyä
selaimella sovelluksen tarjoamiin osoitepolkuihin, jolloin
luonnollisesti käyttäjälle olisi hyvä jotain palauttaa. Kaikkiin GET
pyyntöihin saadaan joko pyydetyt tulokset JSON-tulokset tai huomautus,
että kyseessä on rajapinta eikä selaimella käytettävä verkkosivu. API
Koostuu seuraavista reiteistä:\
\
**GET /api/all**\
Tämä reitti palauttaa kaikki tapahtumat. Voit testata tätä joko suoraan
selaimella tai Postmanilla valitsemalla \"GET\" pudotusvalikosta ja
kirjoittamalla URL-osoitteeksi
https://fs-project2-restapi.onrender.com/api/all\
\
**GET /api/:id**\
Tämä reitti palauttaa yksittäisen tapahtuman perustuen id:hen. Voit
testata tätä suoraan selaimella tai Postmanilla valitsemalla \"GET\"
pudotusvalikosta ja kirjoittamalla URL-osoitteeksi
https://fs-project2-restapi.onrender.com/api/123456789012, missä
123456789012 on haettavan tapahtuman dokumentti-id.\
\
**PUT /api/:id**\
Tämä reitti päivittää olemassa olevan tapahtuman. Voit testata tätä
Postmanilla valitsemalla \"PUT\" pudotusvalikosta ja kirjoittamalla
URL-osoitteeksi
https://fs-project2-restapi.onrender.com/api/123456789012, missä
123456789012 on päivitettävän tapahtuman id. Lisää \"Body\" osioon
JSON-muotoinen päivitys, esimerkiksi:\
\
{\
\"name\": \"Päivitetty tapahtuma\",\
\"date\": \"2022-12-31\",\
\"location\": \"Helsinki\",\
\"description\": \"Tämä on päivitetty tapahtuma\",\
\"published_until\": \"2022-12-30\"\
}\
\
**Huomioitavaa päivityksessä on, ettei kaikkia tietoja ole pakko
päivittää vaan voidaan antaa vain ne arvot jotka halutaan. Esimerkiksi
vain location.**

**DELETE /api/delete/:id\
**Tämä reitti poistaa olemassa olevan tapahtuman. Voit testata tätä
Postmanilla valitsemalla \"DELETE\" pudotusvalikosta ja kirjoittamalla
URL-osoitteeksi
https://fs-project2-restapi.onrender.com/api/delete/123456789012, missä
123456789012 on poistettavan tapahtuman id.

# Linkit

## Verkkosivuni osoite

https://fs-project2-restapi.onrender.com/

## Linkki GitHub repositorioon

https://github.com/fin-nidhogg/fs_project2_restapi

## Linkki projektin videoesitykseen
