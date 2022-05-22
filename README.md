# WORK SO FAR (23/05/2022)
## Research
Om efficient een blockchain te kunnen ontwikkelen moet men natuurlijk eerst weten wat een blockchain precies is en hoe zo'n blockchain precies werkt.
Het boek Blockchain Basics van Daniel Drescher is een goudmijn van informatie voor mensen die tot de werking en het nut van een blockchain willen ontdekken.
Hier leerde ik dat een blockchain in de kern een aaneenschakeling is van SHA-256 gehashte data. Doordat in de hash van een block de hash van de vorige block verwerkt zit,
en een hash nooit kan worden gedecrypteerd, kan een block dus ook nooit worden aangepast zonder dat daarbij de hele chain ineenvalt. Dit het hele principe achter blockchain.
Daarnaast leerde ik ook dat op een blockchain een smart-contract kan worden aangemaakt, die alle interacties die gebeuren op een blockchain regelt. 
Net zoals een echt contract verbind een smart contract 2 of meerdere partijen ertoe een prestatie te leveren. Bij een smart contract wordt dit echter gewaarborgd door de blockchain.
De transactie zal in de praktijk dus pas doorgaan als alle voorwaarden die in het smart contract zijn opgenomen zijn vervuld door beide parijen, en pas dan zal de block worden
toegevoegd aan de blockchain. Met kan al snel beginnen denken aan de talloze toepassing voor deze handige technologie.

## Eerste deel uitwerking project
Na een mooi beeld te hebben van de blockchain technologie begon ik meteen met het opstarten van mijn eerste blockchain-project a.d.h.v. Hyperledger Fabric.
Eerst volgede ik een 'Getting Started'-guide op de documentatiesite van Fabric. Het eerst wat ik moest doen was WSL2 en daarop Ubuntu 20.04 installeren, want alle development
met Hyperledger gebeurt op Linux. Daarnaast had ik ook Docker en Docker-compose nodig, want ik maakte gebruik van 2 docker-containers als stand-ins voor 2 peer-organizations die in
een echte situatie zouden communiceren met elkaar via de blockchain. De peer-organizations zijn de deelnemers van de blockchain, in het echt zouden dit 2 bedrijven zijn.
Ook Node.js had ik nodig, want rond de chaincode(de codebase die de blockchain vormt) is een Node Api gebouwd die later bevraagd zal worden door de front-end applicatie.
Ten slotte kon ik ook de Fabric binaries in deze directory installeren. In deze binaries zitten een heleboel scripts die voor de developer al heel wat dingen aanmaakt en configureert:
Zo wordt er een testnetwerk opgezet met 2 dockercontainers die als peer-organizations dienen. Deze kunnen wel verder worden geconfigureerd, maar in mijn app noemen ze nog Org1 en Org2.
Deze nemen samen deel aan een kannaal genaamd 'supplychannel'. Dit is de eigenlijke blockchain. Mijn project kreeg de working title 'Smart Supply' omdat ik beoog
een blockchain te ontwikkelen voor een bepaalde supplychain. Na het installeren en configureren van deze 2 peers en het kannaal (de eigenlijke chaincode + smart contract),
kon ik al enkele handelingen doen vie de CLI. Dit vooral om te testen dat alles werkte. Uiteraard is het de bedoeling dat alles programmatisch gebeurt.
Daarom maakte ik een nieuwe Node.js app aan genaamd 'asset-app'. Hier gebeuren alle handelingen met de assets op de blockchain.
Out of de box krijg je bij een installatie van hyperledger fabric alle functionaliteit die in deze app zit. Echter is dit standaar heel onoverzichtelijke code.
Daarop heb ik, onder leiding van een guide, deze code opgesplitst in 3 klassen en verder herschreven zodat die veel leesbaarder wordt en ik deze code ook volledig versta.
Met deze functinaliteit is de blockchain up and running en zou ik de api die errond zit kunnen bevragen. En dit is waar ik tot zover ben gekomen.
De volgende stap is het ontwikkelen van een eenvoudige frontend applicatie die de werking van deze blockchain mooi zal demonstreren. 


# PROJECT PITCH: SMALL SCALE PRIVATE BLOCKCHAIN
## Hyperledger Iroha / Hyperledger Fabric

### Voorstel tot innovative project
Voor dit innovatief project zou ik me willen verdiepen in het onderwerp 'Blockchain', de razend populaire en relatief jonge technologie die vandaag vooral bekend is vanwege het actuele fenomeen van de cryptomunten. Deze cryptomunten en aanverwante markten zijn echter ontwikkeld en steunen op een bepaald platform/technologie: Blockchain. Het stelt de verschillende deelnemers van van de 'chain' in staat om op een waterdichte manier gegevens met elkaar te delen en op een effciente, bijna automatische manier consensus over de geldigheid van deze gegevens te bereiken. Dit gebeurd door 'distributed ledgers', twee woorden die blockchain technologie in een brede zin bijhoorlijk goed samenvatten. Ik zal hierover verder in detail treden in mijn research.

Ikzelf heb momenteel slechts een heel oppervlakkige en algemene kennis van het onderwerp. Deze zomer last ik Blockchain Basics van Daniel Drescher, dat me een brede kijk gaf op de technolgie, de principes ervan aantoonde en enkele use cases voorschotelde. Over de echte technische kant van de zaak ken ik vrijwel niets. Ik zal dus vanaf 0 moeten beginnen als het gaat over research voor het ontwikkelen van een blockchain.

### Motivatie
Mijn interesse in dit onderwerp is er vooral gekomen door de nieuwsgierigheid naar nieuwe, baanbrekende technologien. Een van de grootste redenen waarom ik deze opleiding volg, is omdat ik graag wil meewerken aan de wereld van morgen. Blockchain is een niche in IT/Software Development die volgens mij heel veel groeipotentieel heeft. Volgens sommigen is het zelfs de "Next Big Thing" net zoals internet dat was in de jaren 90. Daarom wil ik me zo snel mogelijk verdiepen in dit onderwerp, al is het maar om een notie te hebben van de technologie. Zo koos ik ook voor een stage als Full Stack Web Ontwikkelaar bij Howest Privacy & Security, de IT-researchgroep van onze school waar vooral ook onderzoek wordt gedaan naar Blockchain. Jammer genoeg zal ik niet aan de slag gaan met het ontwikkelen van Blockchains zelf, omdat hiervoor niet genoeg tijd voor is. Toch lijkt het me een leuk idee en de ideale kans om me hier zelfstandig in te verdiepen a.d.h.v. mijn innovative project.
Zo zal ik tijdens mijn stage ook een duidelijker beeld krijgen van de link tussen mijn stageproject, een full stack web app met laravel, en de blockchain waaraan die gekoppeld kan worden.

### Uitwerking
De uitwerking van het project zal ik met het Hyperledger-platform doen, een open-source foundation dat verschillende Blockchain-frameworks ter beschikking stelt.
Ik heb nog niet echt zicht welke van deze frameworks ik specifiek zou gaan gebruiken, want ze hebben elk hun eigen doelen en nut. Momenteel vind ik het meeste info over Hyperledger Fabric, omdat dit de eerste release was, en Hyperledger Iroha, omdat dit de meest lightweight versie is. Het valt dus nog te zien welke gebruikt zullen worden naargelang ik meer research doe over de technologie en het platform.

Ik beoog een kleinschallige private Blockchain te ontwikkelen. Hierbij zullen de belangrijkste doelen van de Blockchain-technologie aan bod komen: het efficient en veilig delen van data aan de hand van een centrale 'ledger', en dit tussen enkele 'nodes' (deelnemers). Hier zal ook een stukje identity aan verbonden zijn om de deelnemers en hun transacties te verifieren en authoriseren. Ik ben er nog niet uit welke transacties mogelijk zullen zijn, maar het belangrijkste doel van dit project is dan ook de werking van een blockchain aantonen op een kleinschalig doch betekenisvol niveau.

## Bronnenlijst
- Drescher Daniel, Blockchain Basics, 2017
- https://hyperledger-fabric.readthedocs.io/
- https://www.youtube.com/watch?v=k4KKrQOV6SE&t=364s
- https://www.youtube.com/watch?v=J1RfcEzD9rw&t=692s
