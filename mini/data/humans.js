SPA.data = {
	props: {}
};

const props = SPA.data.props;

props.age = {
	type: "subtitle",
	value: (data) => data.first ? getRndBias(18,50,20,0.15) : getRndBias(0,90,20,0.3),
	display: (data) => "Age "+parseInt(data.age)
}
props.born = {
	type: "subtitle",
	// if value function errors or returns undefined or NaN, skip for the loop
	//		null should be accepted but not displayed
	value: (data) => Date.now() - Math.floor(data.age * 31556952000),
	display: (data) => "Born "+(new Date(data.born)).toLocaleDateString(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric"
	}),
	display: (data) => {
		let date = new Date(data.born);
		return "Born "+date.getDate()+" "+date.toLocaleDateString(undefined, {month: "short"})+" "+date.getFullYear()+" @ "+date.toLocaleTimeString(undefined, {hour: "numeric",minute: "numeric"});
	},
	blurb: (data) => {
		let date = new Date(data.born);
		let today = new Date();

		if (date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
			return "Today is ${g:his,her,their} birthday!";
		}
	}
}

props.firstname = {
	hidden: true,
	value: {
"gender=x": "Denim|Harley|Bib|Totoro|Hunter|Carter|Haru|Nico|Devin|Berlin|Onox|Winny|Rudie|Rohan|Asher|Yuki|Mika|Lenny|Parker|Theo|Jesse|Dakota|Yona|Lennon|Artemis|Pasha|Ira|Chale|Finley|Aspen|Kori|Cali|Zion|Ari|Ellis|Ash|Sage|Mal|Rocket|Emerson|Renne|Wehinahpay|Atlas|Rayne|Reese|Ollie|Marley|Blaize|Brynn|Bright|Micah|Bronx|Blake|Iolo|Roshan|Elliot|Derry|Maxi|Gaia|Shiloh|Quinn|Rio|Lake|Dandelion|Max|Jamie|Rory|Eivor|Sawyer|Jordan|Briar|Sock|Egypt|Jett|Sunny|Aman|Salem|Goren|Phoenix|Leith|Cloudy|Esra|Hedly|Charlie|Remi|Harlow|Finch|June|Wicket|Fallon|Devon|Sloan|Harlan|Stormy|Selah|Ryo|Bailey|Uzuri|Maverick|Bowie|Alfa|Skylar|Ignis|Hallie|Beau|Rae|Mel|Brenner|Jann|Rowan|Bo|Barrie|Dior|Opal|Sloane|River|Zaley|Darcy|Remy|Ryder|Bodie|Maku|Breeze|Presley|Luca|Faye|Jalin|Brooks|Jude|Sasha|Rei|Dillon|Reggie|Colby|Harper",
"region=afr": {
    "gender=m": "Abdallah|Abdel-Rahman|Abdela|Abdelaziz|Abdelkader|Abdi|Abdo|Abdou|Abdoulaye|Abdul|Abraham|Abu|Abubakar|Adam|Adama|Ahmed|Ali|Aliou|Amadou|Amine|Amir|Antonio|Asim|Ayoub|Bakary|Barack|Beshoi|Bilal|Cheikh|Daniel|David|Désiré|Djamel|Ebrahim|Emmanuel|Fadi|Fahim|Farah|George|Habib|Halim|Hamza|Haroun|Hassan|Hussein|Ibrahim|Ibrahima|Jamal|James|John|José|Joseph|Juan|Junior|Karim|Kemal|Khaled|Kirollos|Kwame|Langelihle|Laurent|Leano|Lesedi|Lethabo|Lethokuhle|Lubanzi|Mahamadou|Mahamed|Mahmoud|Mamadou|Manuel|Mark|Mehamed|Michael|Mina|Mobutu|Modibo|Modou|Mohamad|Mohamed|Mohammed|Moses|Moussa|Muhammed|Murad|Musa|Mustafa|Naïm|Nelson|Nkanyezi|Nkazimulo|Okot|Omar|Oumar|Ousmane|Patrice|Peter|Pierre|Prince|Rachid|Said|Sajed|Samir|Samuel|Sani|Sekou|Selim|Siphosethu|Solomon|Souleymane|Suleyman|Sunday|Taha|Tareq|Umar|Usman|Wassim|Yaakoub|Yahya|Yassin|Yassine|Younès|Youssef|Zakaria",
    "gender=f": "Adama|Adjoua|Affoue|Ahou|Aïcha|Aisha|Aissatou|Aïssatou|Akissi|Aman|Amara|Ameera|Amenan|Amina|Aminata|Amira|Amoin|Amy|Aninha|Annie|Araya|Asha|Ashraqat|Assia|Awa|Aya|Berta|Beya|Bintou|Blessing|Brou|Christiana|Coumba|Daba|Dalal|Djeneba|Doha|Domingas|Edna|Eisha|Eline|Elizabeth|Esperanza|Essil|Esther|Fajr|Fanta|Farah|Farida|Fatima|Fatin|Fatma|Fatou|Fatoumata|Felismina|Francis|Gamalat|Gamila|Glória|Grace|Habib|Habiba|Hadja|Halima|Hana|Hasnaa|Hawa|Hoda|Hosna|Hosniya|Huda|Iman|Imene|Inès|Irene|Isabel|Jean|Joaquina|Josephine|Jouri|Joy|Kadiatou|Karima|Khadija|Khady|Layla|Lesedi|Lethabo|Lina|Lisakhanya|Lou|Lydia|Lyna|Maha|Malak|Mamie|Maria|Mariam|Mariama|Mariame|Mariana|Marie|Mariem|Marina|Martha|Marwa|Mary|Maryam|Maryan|Mayar|Melissa|Melokuhle|Meriem|Milagrosa|Mona|Nada|Ndeye|Nesreen|Nida|Nkanyezi|Noor|Nora|Noûr|Olwemihla|Omphile|Onalerona|Onthatile|Oretha|Oumou|Patience|Rahel|Rania|Rayhane|Rebecca|Reem|Rowan|Sahar|Sahra|Salma|Samira|Sara|Sarah|Shahd|Shaimaa|Sima|Soujoud|Suha|Victoria|Vitória|Yasmin|Yasmine|Zahra|Zainab|Zanokuhle|Zulmira"
},
"region=sam": {
    "gender=m": "Aarón|Adrian|Adrián|Adriel|Agustín|Aibar|Aiden|Alejandro|Alexander|Aminadab|Amir|Andrew|Ángel|Antonio|Antônio|Artur|Aylam|Baptiste|Bautista|Benicio|Benjamín|Bernardo|Bruno|Caleb|Carlo|Carlos|Che|Cristhian|Cristiano|Daniel|Dante|Dariel|Davi|David|Dylan|Dyllan|Eddy|Eduardo|Eider|Eithan|Emiliano|Emmanuel|Endrick|Enoc|Enzo|Ernesto|Ethan|Facundo|Felipe|Fidel|Francisco|Fulgencio|Gabriel|Gael|Gaspar|Heitor|Ian|Ider|Isaac|Jacques|Jair|James|Jatniel|Jayden|Jean|Jesus|João|Joaquín|Johan|John|Jon|Jorge|José|Joseph|Joshua|Josiah|Juan|Julián|Junior|Keven|Kevin|Leonardo|Liam|Lionel|Lorenzo|Louis|Lucas|Luciano|Luis|Luiz|Malachi|Manuel|Marc|Marcelo|Marcos|Mateo|Matheo|Mathias|Matías|Matteo|Maximiliano|Máximo|Miguel|Nathan|Nathaniel|Neymar|Nicolás|Noah|Oliver|Pablo|Paulo|Pedro|Pierre|Rafael|Raúl|Ravi|Roberto|Ronaldo|Salatiel|Salvador|Samuel|Santiago|Sebastián|Théo|Thiago|Valentín|Valentino|Vicente|Zahir",
    "gender=f": "Abby|Abigail|Abril|Adriana|Ailany|Aitana|Alahia|Alaia|Alejandra|Alessandra|Alessia|Alexia|Alice|Alicia|Aline|Allison|Alma|Almudena|Alysha|Amanda|Ámbar|Amelia|Amira|Ana|Anieli|Antonella|Antônia|Aria|Ariadna|Ariana|Arianna|Arleth|Ashley|Astrid|Aurora|Azaria|Azariah|Azora|Barbara|Bianca|Cailín|Camila|Caridad|Cataleya|Catalina|Cecília|Charlotte|Cristel|Danae|Danna|Dara|Delfina|Elena|Elianny|Elianys|Elizabeth|Emely|Emilia|Emily|Emma|Esther|Fabienne|Fernanda|Fiorella|Francisca|García|Gianna|Gloria|Griselda|Hannah|Helena|Heloísa|Isabella|Isabelle|Isidora|Isis|Ivanna|Jacqueline|Juliana|Julieta|Julimar|Kassandra|Kiara|Kyra|Laura|Luana|Lucía|Luciana|Maddie|Maia|Maitê|Marcia|Maria|María|Marian|Marie|Marjorie|Martina|Mercedes|Meredith|Mia|Mía|Milagros|Miranda|Nadège|Natacha|Nathalie|Odalys|Olivia|Patrícia|Paula|Renata|Rose|Roseline|Salomé|Sara|Shakira|Sofía|Sophia|Stephanie|Tania|Trinidad|Valentina|Victoria|Yadira|Yanet|Zoe|Zoé"
},
"region=nam": {
    "gender=m": "Aaron|Adam|Adrian|Adriel|Aiden|Al|Alexander|Andrew|Angel|Anthony|Antonio|Aputsiaq|Archer|Arnold|Arthur|Asher|Atlas|August|Axel|Barack|Beau|Ben|Benjamin|Bennett|Bill|Boys|Brad|Bradley|Brendan|Brock|Brooks|Bruce|Bryan|Caleb|Cameron|Cardi|Carter|Cary|Charles|Charlie|Chris|Christian|Christopher|Clint|Cooper|Cristiano|Daniel|David|Dennis|Denzel|Diego|Drew|Dwayne|Dylan|Édouard|Edward|Eithan|Eliam|Elian|Elias|Elijah|Emiliano|Enzo|Ethan|Everett|Ezekiel|Ezra|Gabriel|Gael|George|Grayson|Halle|Harrison|Heath|Henry|Hudson|Hugh|Hugo|Ian|Iker|Inuk|Inunnguag|Inutsiaq|Isaac|Isaiah|Ivik|Jack|Jackson|Jacob|Jake|James|Jason|Jayden|Jean-Claude|Jeremiah|Jesus|Jet|Jim|John|Johnny|Jonathan|Jose|Joseph|Joshua|Josiah|Juan|Julian|Justin|Kai|Kate|Keanu|Kevin|LeBron|Leo|Léo|Leonardo|Levi|Liam|Lincoln|Lionel|Logan|Louis|Luca|Lucas|Luka|Luke|Macaulay|Maligiaq|Malik|Mark|Marlon|Mason|Mateo|Matt|Matthew|Maverick|Maximiliano|Micah|Michael|Miki|Miles|Minik|Morgan|Myles|Nathan|Nicolas|Noah|Nolan|Norsaq|Nuka|Oliver|Orlando|Owen|Pablo|Peter|Pierce|Qillaq|Richard|Robert|Robin|Roman|Rowan|Russell|Ryan|Salik|Samuel|Santiago|Scotty|Seann|Sebastian|Sebastián|Silas|Steve|Steven|Sylvester|Theo|Théo|Theodore|Thiago|Thomas|Tim|Tom|Tommy|Ulloriaq|Vin|Vince|Virat|Walker|Warren|Waylon|Wesley|Weston|Will|William|Wyatt",
    "gender=f": "Abigail|Addison|Adeline|Ainara|Alexa|Alia|Alice|Amara|Amelia|Amira|Anastasia|Angelina|Anne|Antonella|Arabella|Aria|Ariana|Audrey|Aurora|Autumn|Ava|Avery|Aviana|Ayla|Barbara|Beatrice|Billie|Camila|Caroline|Catalina|Celine|Charlie|Charlotte|Chloe|Claire|Clara|Daisy|Delilah|Demi|Dorothy|Dua|Eden|Eleanor|Elena|Eliana|Elizabeth|Ella|Ellen|Ellie|Eloise|Emery|Emilia|Emily|Emma|Evelyn|Everly|Fernanda|Florence|Genesis|Georgia|Gianna|Girls|Goldie|Grace|Hannah|Harper|Hazel|Iris|Isabella|Isla|Ivaana|Ivalu|Ivy|Jackie|Jade|Jennifer|Jessica|Joni|Josephine|Josie|Julia|Juliette|Juniper|Katy|Keira|Kendall|Kennedy|Khloé|Kim|Kinsley|Kourtney|Kylian|Kylie|Lainey|Layla|Leah|Leilani|Liliana|Lillian|Lily|Linda|Lucia|Lucy|Luna|Lydia|Lyla|Madeline|Madelyn|Madison|Maeve|Malu|Margaret|Maria|María|Mary|Maya|McKenzie|Megan|Mel|Melody|Mia|Mía|Mila|Milena|Miley|Millie|Myla|Naomi|Natalie|Nivi|Niviaq|Nora|Nova|Olivia|Paisley|Paneeraq|Paninnguaq|Patricia|Penelope|Pipaluk|Quinn|Rachel|Renata|Rihanna|Riley|Romy|Ruby|Sadie|Sandra|Sarah|Scarlett|Sean|Selena|Shania|Shia|Sienna|Sofia|Sophia|Sophie|Stella|Susan|Taylor|Uiloq|Valentina|Valeria|Victoria|Violet|Vivian|Willow|Winter|Zendaya|Zoe|Zoey"
},
"region=mde": {
    "gender=m": "Abbas|Abd|Abdul|Abdulaziz|Abdulla|Abdullah|Abdullo|Abdulloh|Abdulrahman|Abubakr|AbulFazl|Adam|Ahmad|Ahmed|Ahmet|Alan|Ali|Ali-Reza|Alidar|Alikhan|Alinur|Alparslan|Amir|Amir-Abbas|Amir-Ali|Amir-Hossein|Ammar|Anar|Aras|Areg|Ari|Aria|Ariel|Arif|Arman|Armen|Artur|Ashot|Ashraf|Asif|Atlas|Ayaan|Aykhan|Aysultan|Bader|Bandar|Barack|Bilal|Charbel|Christian|David|Davit|Eitan|Elchin|Elia|Elias|Elie|Elnur|Elshan|Emir|Fahad|Fahd|Faisal|Farhan|Gagik|George|Gevorg|Göktuğ|Hamid|Hani|Hasan|Hashim|Hassan|Hayk|Hisham|Hossein|Hovhannes|Hüseyin|Huseyn|Hussain|Hussein|Hydar|Ibrahim|Ilgar|Imran|Imronbek|İsmail|Jesus|Joe|Jude|Karam|Karen|Kathem|Kazi|Kerem|Khaled|Khamza|Lavi|Leo|Liam|Mahdi|Mahmoud|Mark|Mehmet|Metehan|Michael|Mik’ayel|Miran|Mohamed|Mohammad|Mohammad-Reza|Mohammad-Taha|Mohammed|Mont’e|Muhamad|Muhammad|Muhammadali|Muhammadamin|Muhammadjon|Muhammadyusuf|Muhammadziyo|Muhammed|Mukhammad|Mukhammed|Murad|Mustafa|Mustafo|Nabeel|Narek|Niel|Nomaan|Nurislam|Nurmuhammad|Omar|Omer|Ömer|Osama|Osman|Rahim|Raphael|Rashad|Rashid|Raul|Reza|Robert|Saeed|Salman|Sami|Samir|Samvel|Samyar|Sanad|Saqib|Sasan|Shaham|Shahid|Sheikh|Syed|Taim|Tigran|Tunar|Turki|Uğur|Umar|Uri|Usman|Vugar|Vusal|Yehuda|Yosef|Yousef|Yousouf|Yusef|Yusif|Yusuf|Zahid|Zidan",
    "gender=f": "Adel|Aisha|Alaa|Alanoud|Aline|Alisa|Aliya|Alya|Amal|Amina|Anahit|Angelina|Anna|Anohito|Armine|Arp’i|Aruuke|Aruuzat|Asel|Asiya|Asma|Asya|Asylym|Ava|Avigail|Ayala|Ayalah|Ayesha|Aygun|Ayim|Ayla|Aylin|Ayşe|Aysel|Aysha|Baran|Bismah|Celine|Christina|Dalal|Defne|Duru|Edel|Elif|Elisa|Ella|Eman|Emili|Emine|Farah|Faria|Farjana|Farrah|Farzana|Fatema|Fatemeh|Fatemeh-Zahra|Fatima|Fátima|Fatma|Fozia|Gal|Gayane|Gökçe|Googoosh|Gunay|Gunel|Hadicha|Hanan|Hasmik|Hatice|Helma|Hessa|Huda|Hur|Hussa|Ifora|Imona|İnci|Indira|Jannat|Jannatul|Jessica|Jori|Karine|Khadije|Konul|Latifa|Layla|Leah|Leen|Leyla|Lia|Lian|Libi|Lilit|Lin|Lulwa|Lur|Luse|Lusine|Lyn|Ma'soumeh|Maha|Malak|Malek|Mane|Maria|Mariam|Marie|Mariyam|Marya|Maryam|Massa|Maya|Maysoun|Medina|Melisa|Mersana|Meryem|Mila|Mira|Miriam|Misk|Mona|Mudina|Muslima|Musrat|Nadia|Nare|Narine|Nasrin|Nazanin-Zahra|Nilay|Noa|Noor|Nora|Nouf|Nur|Oisha|Rafia|Rayana|Reem|Reema|Roghayyeh|Sa'diya|Sadia|Safiya|Saia|Sakeena|Sakineh|Saliha|Salma|Sama|Sara|Sarah|Şerife|Sevda|Sevinj|Shaikha|Shams|Sharmin|Sherifa|Shirin|Shukrona|Sobia|Sofia|Soliha|Somayyeh|Sultan|Sumaiya|Sumayah|Sumayya|Susanna|Tamar|Tania|Tarana|Taslima|Tomiris|Umay|Vusala|Wateen|Yael|Yasmin|Yasmina|Yasna|Yeva|Zahra|Zainab|Zayna|Zehra|Zeinab|Zeynep"
},
"region=asi": {
    "gender=m": "Aarav|Aariz|Abdul|Adam|Ahmad|Ai|Amar|Anand|Anil|Ao|Arjun|Asahi|Ashok|Avyan|Ba|Cary|Chandra|Chia-hao|Chiang|Chien-hung|Chih-chiang|Chih-hao|Chih-ming|Chih-wei|Chin-lung|Chun-chieh|Chun-hung|Da|Dani|Deng|Dhan|Dhruv|Di|Dinesh|Do-yeon|Do-yoon|Duy|Erhes|Ethan|Eun-woo|Ezekiel|Fernando|Gabriel|Ha-joon|Hai|Haji|Hàorán|Hàoyǔ|Hari|Harraz|Haru|Haruka|Haruto|Heng|Herman|Hieu|Hinata|Hinato|Hoang|Hùng|Huy|Iman|Iori|Ismail|Izz|Jackie|Jacob|Jayden|Jensen|Ji-ho|Jon|Jong|Junaidi|Kabir|Kamal|Keanu|Khan|Khangai|Kiaan|Krishan|Krishna|Kumar|Lal|Lamin|Lau|Liam|Long|Mahatma|Mahesh|Mangal|Manny|Manoj|Mao|Matthew|Minato|Mohamad|Mohamed|Mohammad|Mohammed|Muhamad|Muhammad|Mulyadi|Nagi|Nam|Narendra|Narong|Nathan|Nathaniel|Nima|Noah|Nurul|Pan|Pol|Pradeep|Prasit|Prasoet|Prem|Raj|Rajesh|Ram|Ramesh|Ran|Raza|Ren|Ritsu|Roi|Ron|Roshan|Rui|Ruki|Ryan|Saku|Sam|Saman|Sanjay|Santosh|Satya|Seo-jun|Seon-woo|Shivansh|Si-woo|Slamet|Som|Sombat|Sombun|Somchai|Somphon|Somsak|Son|Song|Sora|Suk|Sun|Sunil|Sunny|Supardi|Suparman|Suprianto|Sutrisno|Tenun|Tuân|Tushig|Udom|Umar|Un|Vedant|Viraj|Wahyudi|Wan|Wen-Hsiung|Wichian|Xi|Yi-joon|Yìchén|Yong|Yoo-joon|Yǔchén|Yǔháng|Yuito|Yūto|Yǔxuān|Zan|Zǐháo|Zǐmò",
    "gender=f": "Aadhya|Aarya|Aditi|Ah-rin|Ah-yoon|Aisyah|Althea|Amal|Amayra|Amber|Amin-Erdene|Aminah|Angel|Anh|Anhilen|Anita|Anjana|Aoi|Aruna|Asela|Asha|Ayaha|Ayesha|Ayra|Chan|Chandra|Chang|Chloe|Cixi|Devi|Dhia|Egshiglen|Ernawati|Gita|Hà|Ha-yoon|Han|Himari|Hina|Hoa|Hong|I-chun|Imelda|Inaya|Indra|Iroha|Ji-ah|Ji-an|Ji-yoo|Jiya|Kamala|Kanchana|Kartini|Kě xīn|Kiara|Kim|Kinga|Koharu|Kotoha|Krishna|Laxmi|Lee|Lei|Li|Li-hua|Lin|Ling|Linh|Liza|Mali|Man|Maria|Mary|Maryam|Mashiro|Mehar|Mei|Mei-hui|Mei-ling|Mèng yáo|Michele|Midori|Min|Mina|Mio|Nan|Nathalie|Naura|Nayana|Ngọc|Nguyên|Ni|Nirmala|Nittaya|Noor|Nor|Nur|Nurhayati|Nurul|Pari|Phương|Prani|Princess|Priyanka|Puteri|Rattana|Rekha|Rin|Samantha|Santa|Seo-yoon|Seoh-ah|Shanti|Shi-ah|Shu-chen|Shu-chuan|Shu-fen|Shu-hua|Shu-hui|Sina|Sita|Siti|Sofia|Somchit|Sondor|Sophie|Sui|Sukanya|Sulastri|Sumarni|Sumiati|Sunarti|Sunita|Tara|Thảo|Thea|Thùy|Ting|Trang|Tsumugi|Usha|Uta|Vamika|Vanessa|Wan|Wanphen|Watsana|Wei|Wilai|Xīn yán|Xīn yí|Ya-ting|Yan|Ye|Yi|Yī nuò|Yi-seo|Yin|Yu|Yǔ tóng|Yǔ xī|Yuzuki|Zǐ hán|Zia|Zoey"
},
"region=eur": {
    "gender=m": "Aatos|Adam|Adi|Adomas|Adrian|Adrien|Afonso|Aga|Aidan|Aimar|Aksel|Al|Alejandro|Aleksa|Aleksandar|Aleksander|Aleksandr|Aleksandre|Alessandro|Àlex|Alexander|Alexandros|Alexandru|Alexey|Alfie|Alfred|Ali|Aliaksandr|Alteo|Alvar|Amar|Andrea|Andreas|Andrei|Andrej|Andrew|Angelos|Antoni|Archie|Arnold|Aron|Artem|Arthur|Artyom|August|Ąžuolas|Baldur|Benas|Bence|Biel|Billy|Birkir|Birnir|Björn|Bogdan|Bohdan|Boris|Brandur|Brock|Bronson|Cameron|Carl|Chad|Charles|Charlie|Christopher|Christos|Cillian|Claude|Claudio|Cole|Cristiano|Dachi|Damian|Damir|Damjan|Dan|Daniel|Dániel|Danylo|Dario|Dave|David|Davud|Dejan|Demetre|Dimitar|Dimitrios|Dimitris|Dion|Dmitry|Dmytro|Dolph|Dominic|Dominik|Dominykas|Dragan|Duarte|Dušan|Dwight|Dylan|Edoardo|Eduard|Edward|Eino|Eiri|Elias|Elio|Emil|Emīls|Enzo|Erling|Erwin|Evgeny|Feđa|Felix|Filip|Finlay|Finn|Fionn|Florence|Francesco|Francisco|Franciszek|Franz|Freddie|Gabriel|Gabriele|George|Georgi|Georgios|Giorgi|Giorgos|Goran|Gustavs|Guy|Hamza|Harold|Harris|Harry|Harvey|Hector|Henry|Hugo|Ibai|Ignacy|Igor|Iker|Ilija|Imran|Ioan|Ioane|Ioannis|Ionut|Irving|Isa|Isaac|Ismail|Ivan|Izak|Izei|Jack|Jakob|Jakov|Jakub|Jákup|James|Jan|Jean-Claude|Jēkabs|Jerry|Jesse|Jim|João|Joe|Joel|Jóhan|Johannes|John|Jökull|Jon|Jón|Jonas|Jordi|Jovan|Jude|Judge|Julen|Jules|Julian|Kacper|Kaloyan|Kārlis|Kirk|Klemens|Konstantinos|Lan|Laurin|Lazar|Leano|Lenny|Leo|Léo|Leon|Léon|Leonard|Leonardo|Leonas|Lev|Levente|Levi|Liam|Linus|Lio|Lionel|Lorenzo|Lou|Louis|Lourenço|Lovro|Luca|Lucas|Luis|Luka|Lukas|Lūkass|Luken|Macviej|Maël|Mak|Maksym|Manuel|Marc|Marcell|Marios|Mark|Markas|Markel|Marko|Marks|Martí|Martim|Martin|Martín|Matas|Máté|Matei|Matej|Matěj|Mateo|Matias|Matt|Matteo|Mattheo|Matthías|Mattia|Matvey|Matviy|Matyáš|Maxim|Maximilian|Mees|Menachem|Mercedes|Michael|Michail|Michal|Michalis|Miguel|Mihail|Mikhail|Mikołaj|Milan|Milán|Miloš|Miron|Miroslav|Mohammed|Muhammad|Napoleon|Nic|Nick|Nicolas|Nik|Niko|Nikodem|Nikola|Nikolaos|Nil|Nils|Noa|Nóa|Noah|Noe|Noel|Nojus|Novak|Oihan|Oisin|Oisín|Oiva|Olav|Oleksandr|Olga|Oliver|Olivér|Óliver|Olivers|Omar|Onni|Oscar|Osian|Oskar|Otto|Pablo|Panagiotis|Paul|Pavle|Pedro|Petar|Pol|Ralph|Raman|Raphaël|Rasmus|Ray|Rejan|Rían|Riccardo|Richard|Roan|Rob|Robert|Roberts|Robin|Roel|Roger|Roko|Rory|Sam|Samuel|Samuil|Scott|Sebastian|Sem|Sergei|Sigmund|Šimon|Socrates|Stanisław|Stefan|Ştefan|Steve|Steven|Styrmir|Sylvester|Tadhg|Tchéky|Ted|Teddi|Teddy|Teodor|Teodors|Theo|Theodore|Tim|Tobias|Toma|Tomás|Tomáš|Tomass|Tommaso|Tommy|Tymofiy|Uroš|Vache|Väinö|Valentin|Vasilije|Vasilis|Vicente|Victor|Viktor|Vincent|Vojtěch|Vuk|Vukan|William|Winston|Zalán|Zoran|Zsa",
    "gender=f": "Aada|Aava|Adelė|Adèle|Agnes|Aikaterini|Aina|Aino|Ajda|Ajla|Alaia|Alba|Aleksandra|Alexandra|Alice|Alicja|Alina|Alisa|Alise|Alison|Alma|Amálie|Amaris|Ambra|Ambre|Amelia|Amelie|Amelija|Amēlija|Amelja|Ana|Anastasia|Anastasiya|Anđela|Andrea|Andreea|Androula|Ane|Angelina|Ann|Anna|Anne|Annie|Antonia|Aoife|Aria|Ariana|Astrid|Aurora|Ava|Aya|Ayla|Aþena|Bára|Beatrice|Benedita|Biljana|Birta|Bisera|Björk|Bogdana|Boglárka|Bonnie|Bríet|Brigitte|Brim|Camilla|Carmen|Carolina|Charlotte|Chiara|Chloé|Christina|Clara|Croía|Darcie|Darcy|Daria|Diana|Dimitra|Dora|Dorothy|Dragana|Dua|Dunja|Éabha|Éala|Eevi|Ela|Elena|Elene|Eleni|Elisa|Eliška|Elizabeth|Ella|Ellie|Ellinor|Elsa|Elsie|Ema|Embla|Emilia|Emilía|Emilija|Emīlija|Emiliya|Emily|Emma|Estere|Eva|Evelyn|Evie|Farah|Fiadh|Fiona|Florence|Francisca|Freja|Freya|Frida|Gabija|Gabriela|Gabrielle|Gala|Georgia|Ginevra|Giulia|Glæma|Gordana|Grace|Halle|Hallie|Hana|Hanna|Hannah|Harper|Hedda|Hekla|Helen|Helena|Ida|Ilenia|Iman|Imogen|Ioana|Ioanna|Irina|Iris|Isabella|Isabelle|Isla|Ivana|Ivy|Izabelė|Jade|Jana|Jane|Jelena|Jennifer|Joan|Jordi|Jovana|Joy|Julia|Júlia|Júlía|Julie|Juliette|Julija|June|Kamilla|Karla|Katerina|Kateryna|Kelly|Klea|Konstantina|Kris|Ksenija|Kseniya|Kyriaki|Lady|Laia|Lara|Laura|Lea|Leandra|Lena|Léna|Lenna|Leonie|Leonor|Leyla|Lia|Liepa|Lile|Lili|Lilja|Lilly|Lillý|Lily|Lina|Linda|Linnea|Lisa|Lív|Livia|Ljiljana|Lottie|Lou|Louise|Luca|Lucia|Lucía|Lucija|Ludovica|Luisa|Luknė|Luna|Mabel|Maddi|Maja|Malen|Mali|Maria|María|Mariam|Mariami|Marie|Marija|Mariska|Mariya|Marjun|Marta|Martina|Maša|Mateja|Mathilda|Matilde|Matthildur|Maya|Meabh|Melānija|Melina|Melisa|Mia|Michelle|Mihaela|Mila|Milena|Milica|Millie|Milou|Mirjana|Nađa|Nahia|Natalia|Natália|Natálie|Nelia|Nene|Nia|Nika|Nikol|Nina|Nitsa|Noelia|Noor|Nora|Nur|Olga|Olivia|Olívia|Olivija|Oliwia|Ona|Panagiota|Paula|Petra|Phoebe|Pola|Polina|Poppy|Raya|Reina|Rita|Romina|Romy|Rosanna|Rose|Rosie|Rozálie|Sadie|Safija|Sara|Sára|Sasha|Scarlett|Selma|Shia|Sienna|Silja|Snezana|Snežana|Sofia|Sofía|Sofie|Sofiia|Sofija|Sofiya|Sólja|Solomiya|Sophia|Sophie|Stefania|Susan|Suzana|Sviatlana|Taia|Tara|Tatiana|Teodora|Teresa|Timea|Ulrika|Uma|Una|Valea|Valentina|Valeria|Vanessa|Varvara|Vasiliki|Vasilisa|Vega|Vera|Vesna|Victoria|Viktória|Viktorie|Viktoriya|Viola|Violeta|Vita|Vittoria|Willow|Yara|Yekaterina|Yelena|Yeva|Yulia|Zala|Zlata|Zoé|Zofia|Zuzanna"
},
"region=oce": {
    "gender=m": "Ariki|Asher|Charlie|David|Domingos|Elijah|Emmanuel|Ezekiel|Ezra|Francisco|Gabriel|George|Henry|Hia'ai|Hiro|Hudson|Ioane|Isaiah|Jack|James|João|John|José|Joseph|Kahanui|Kahurangi|Kai|Kayden|Kiwa|Koa|Leo|Levi|Liam|Luca|Luis|Luka|Luke|Manaaki|Manea|Manua|Manuel|Marama|Mario|Mateo|Maui|Maverick|Micah|Mikaere|Moana|Nikau|Noah|Oliver|Pedro|Rangi|Rawiri|Roman|Samuel|Tamatoa|Tapuarii|Tehei|Teiki|Teiva|Teva|Theo|Theodore|William|Wiremu",
    "gender=f": "Amelia|Ana|Anahera|Aria|Aroha|Atarangi|Aurora|Ava|Charlotte|Chloe|Elizabeth|Emma|Eva|Filomena|Grace|Harper|Hazel|Heikapu|Hina|Hinano|Isabel|Isabella|Isla|Joana|Juliana|Kaia|Kiana|Léna|Lily|Lucy|Maeva|Maia|Manaia|Marama|Mareva|Matilda|Maya|Merahi|Mia|Mila|Moana|Moea|Moeata|Nina|Ohana|Olivia|Poema|Rangi|Rangimarie|Rita|Rui|Sandra|Sophia|Sophie|Tarita|Teura|Tiare|Titaina|Titaua|Tui|Vaea|Zoé"
}
	}
}

props.lastname = {
	hidden: true,
	value: {
		"region=sam": "Acosta|Aguilar|Aguilera|Aguirre|Alarcón|Allende|Almeida|Alonso|Alvarado|Álvarez|Alves|Andrade|Aravena|Araya|Arias|Ayala|Báez|Barbosa|Batista|Benítez|Bianchi|Blanco|Bolsonaro|Bravo|Bruno|Bustamante|Bustos|Cabello|Cabrera|Cáceres|Calvo|Campos|Cárdenas|Cardozo|Carrasco|Carrizo|Carvajal|Carvalho|Castillo|Castro|Chávez|Chin|Cohen|Colombo|Contreras|Correa|Cortés|Costa|Delgado|Dias|Díaz|Domínguez|Donoso|Duarte|Escobar|Espinoza|Estefan|Farías|Fernandes|Fernández|Ferrari|Ferreira|Ferreyra|Figueroa|Flores|Franco|Freitas|Fuentes|Galeano|Gallardo|Gallo|García|Garrido|Gil|Giménez|Godoy|Gomes|Gómez|González|Guerrero|Guevara|Gutiérrez|Guzmán|Henríquez|Henry|Hernández|Herrera|Huamán|Ibáñez|Iglesias|James|Jara|Jiménez|Joseph|Juárez|Kalloe|Khan|Kluivert|Lagos|Ledesma|Leguizamo|Leiva|Lie|Lima|Lin|Lopes|López|Lorenzo|Luna|Machado|Maldonado|Mamani|Marino|Marques|Márquez|Martín|Martínez|Martins|Medina|Mendes|Méndez|Mendoza|Messi|Miranda|Mohamed|Mohan|Molina|Morales|Moreira|Moreno|Muñoz|Nascimento|Navarrete|Navarro|Nunes|Núñez|Olivares|Oliveira|Orellana|Ortega|Ortiz|Otero|Palma|Paredes|Parra|Pascal|Paz|Peña|Peralta|Pereira|Pereyra|Pérez|Persaud|Pinas|Pino|Pizarro|Poblete|Ponce|Prieto|Quiroga|Quispe|Ramírez|Ramos|Rey|Reyes|Ribeiro|Ríos|Riquelme|Rivas|Rivera|Rivero|Rocha|Rodrigues|Rodríguez|Rojas|Romano|Romero|Ronaldo|Rossi|Ruiz|Ruíz|Russo|Saavedra|Sabajo|Sáez|Salazar|Salinas|San Martín|Sánchez|Sandoval|Sanhueza|Santos|Secada|Semil|Sepúlveda|Silva|Singh|Smith|Soares|Soria|Sosa|Soto|Sousa|Suárez|Tapia|Thomas|Tjin|Toro|Torres|Valdés|Valenzuela|van Dijk|Varela|Vargas|Vásquez|Vazquez|Vega|Venegas|Vera|Vergara|Vidal|Vieira|Villalba|Williams|Wong|Yáñez|Zúñiga",
		"region=nam": "Acosta|Adams|Affleck|Aguilar|Aguirre|Alba|Allen|Alvarado|Alvarez|Álvarez|Anderson|Aniston|Araya|Arsenault|Atkinson|Ávila|Ayala|Bailey|Baker|Bale|Banderas|Barrymore|Beckham|Beckinsale|Bell|Bennet|Bennett|Berry|Bezos|Bhatt|Bieber|Biggs|Black|Bloom|Bouchard|Bowman|Brando|Brin|Brooks|Brosnan|Brown|Bullock|Cabrera|Cage|Calderón|Camacho|Cameron|Campbell|Campos|Cárdenas|Carell|Carrey|Carrillo|Carter|Castañeda|Castillo|Castro|Cervantes|Chan|Chaplin|Chavez|Chávez|Chen|Chopra|Christ|Clark|Clooney|Collins|Connery|Contreras|Cook|Cooper|Cormier|Cortez|Côté|Cox|Craig|Crowe|Cruise|Cruz|Culkin|Cyrus|Damon|Davis|De|de la Cruz|De León|De Los Santos|DeGeneres|Delgado|Dell|Depp|Diaz|Díaz|DiCaprio|Diesel|Dion|Doe|Domínguez|Downey|Eastwood|Edwards|Eilish|Epstein|Escobar|Espinoza|Estrada|Evans|Fernández|Ferrell|Flores|Ford|Fortin|Foster|Fox|Franco|Fraser|Freeman|Friesen|Fuentes|Gagné|Gagnon|Gallant|Garcia|García|Garza|Gauthier|Gelsinger|Gibbons|Gibson|Gomez|Gómez|Gonzales|Gonzalez|González|Grande|Gray|Green|Guerrero|Gutierrez|Gutiérrez|Guzmán|Gyllenhaal|Hall|Hanks|Harding|Harris|Hart|Hathaway|Hemsworth|Hernandez|Hernández|Herrera|Hiddleston|Hill|Holland|Howard|Hughes|Ibarra|Jackman|Jackson|James|Jefferson|Jenner|Jimenez|Jiménez|Jobs|Johansson|Johnson|Jolie|Jones|Juárez|Kapoor|Kardashian|Kelly|Kilabuk|Kim|King|Klassen|Knightley|Kohli|LaBeouf|Lafferty|Landry|Lara|Lavoie|Leblanc|Ledger|Lee|León|Lewis|Li|Lipa|Long|Lopez|López|Lovato|Luna|MacDonald|MacNeil|Mader|Madrigal|Maldonado|Márquez|Marroquín|Martin|Martinez|Martínez|Mbappé|McAdams|McAvoy|McKellen|McLeod|Medina|Mejía|Méndez|Mendoza|Messi|Meza|Miller|Miranda|Mitchell|Modi|Molina|Montes|Moore|Mora|Morales|Moreno|Morgan|Morin|Morris|Muñoz|Murphy|Murray|Musk|Myers|Nakoolak|Nava|Navarro|Neeson|Nelson|Nguyen|Nicholson|Niro|Nolan|Norton|Núñez|Obama|Ochoa|Orellana|Orozco|Ortega|Ortiz|Ortíz|Pacheco|Pacino|Padilla|Page|Parker|Parsons|Patel|Peña|Penner|Perez|Pérez|Perry|Peterson|Phillips|Pitt|Ponce|Portillo|Portman|Power|Powers|Pratt|Price|Putulik|Quaid|Radcliffe|Ramirez|Ramírez|Ramos|Rangel|Reed|Reeves|Reyes|Reynolds|Richard|Richardson|Ridley|Ríos|Rivas|Rivera|Roberts|Robinson|Robles|Rodriguez|Rodríguez|Rogers|Rojas|Romero|Ronaldo|Rosales|Rosario|Rosas|Ross|Roy|Rubio|Ruiz|Ruíz|Salas|Salazar|Salinas|Sanchez|Sánchez|Sanders|Sandler|Sandoval|Santana|Santos|Schwarzenegger|Scott|Segura|Serrano|Shirilla|Silva|Smith|Solís|Soto|Spielberg|Stallone|Stapleton|Statham|Stewart|Stiller|Suárez|Swift|Tapia|Taylor|Thiel|Thomas|Thompson|Torres|Travolta|Tremblay|Trump|Turner|Twain|Valdez|Valencia|Valenzuela|Valverde|Vargas|Vásquez|Vaughn|Vega|Velásquez|Villalobos|Wahlberg|Walker|Walsh|Ward|Warren|Washington|Watson|Weaver|White|Wiebe|William|Williams|Willis|Wilson|Winslet|Wong|Wood|Wright|Young|Zamora|Zuckerberg",
		"region=oce": "Ali|Brown|Chand|Chandra|Deo|Devi|Goundar|Harris|Johnson|Jones|Kaur|Kelly|Khan|Kumar|Lal|Lata|Lee|Maharaj|Martin|Murphy|Naidu|Nand|Narayan|Nguyen|Patel|Prakash|Prasad|Raj|Ram|Reddy|Robinson|Ryan|Sharma|Singh|Smith|Taylor|Thompson|Turner|Walker|Waqa|White|Williams|Wilson",
		"region=eur": "Adkins|Aguilera|Aliyev|Alonso|Álvarez|Amodei|Andersen|Anderson|Andersson|Andreassen|Aniston|Argenziano|Arquette|Arslan|Aslan|Aydın|Aykroyd|Azarenka|Barnyashev|Baumann|Bautista|Begin|Belushi|Bengtsson|Berg|Berlin|Bernasconi|Bianchi|Biehn|Bismarck|Blanco|Blind|Bon Jovi|Bonaparte|Bondar|Bondarenko|Boyko|Brody|Brown|Bruckheimer|Brunner|Buscemi|Caan|Çakır|Campbell|Castagnoli|Castro|Cavadini|Çelik|Cena|Cereghetti|Çetin|Churchill|Clark|Colombo|Crenna|Crivelli|Cromwell|Dąbrowski|Dahl|Darwin|Davies|Delgado|Demir|Diaz|Díaz|DiCaprio|Djokovic|Doğan|Doherty|Domínguez|Đorđević|Driscoll|Duchovny|Edwards|Elizondo|Erdoğan|Eriksen|Eriksson|Evans|Faltermeyer|Farmiga|Federer|Fernández|Ferrari|Ferrigno|Fischer|Fontana|Frank|Frei|Freud|Fyodorov|Gaga|Galli|García|Gerber|Gibson|Gil|Gillen|Giovanni|Gogh|Gómez|González|Grabowski|Graham|Grande|Green|Griffiths|Grove|Gustafsson|Gutiérrez|Haaland|Hagen|Hall|Halvorsen|Hamilton|Hammer|Hansen|Hansson|Hargitay|Haugen|Hauser|Henriksen|Hernández|Hodgkin|Hoxha|Huber|Hughes|Ibragimov|Iglesias|Ilić|Ivanišević|Ivanov|Jackson|Jacobsen|Jakobsson|James|Jankowski|Jansson|Jenkins|Jenner|Jensen|Jiménez|Johannessen|Johansen|Johansson|Johnsen|Johnson|Johnston|Jolie|Jones|Jonsson|Jönsson|Jørgensen|Jovanović|Kaczmarek|Kafka|Kamiński|Kara|Karimov|Karlsen|Karlsson|Karyo|Kaya|Keitel|Keller|Kelly|Kepler|Kirk|Kılıç|Kjellberg|Knopfler|Koç|Korbut|Korkmaz|Koteas|Koval|Kovalchuk|Kovalenko|Kowalczyk|Kowalski|Kozlov|Kozłowski|Kravchenko|Kravitz|Krawczyk|Kristiansen|Kristofferson|Kudrow|Kurt|Kuznetsov|Kwiatkowski|Labba|LaBeouf|Larsen|Larsson|LeBlanc|LeBrock|Lesnar|Levine|Lewandowski|Lewis|Lindberg|López|Lowe|Lund|Lundgren|Lusardi|Luther|Lysenko|Macchio|MacDonald|Magnusson|Magomedov|Mann|Marchenko|Marín|Marković|Martin|Martín|Martínez|Mazur|McLaughlin|Meier|Melnyk|Metternich|Meyer|Mikhaylov|Milošević|Mirren|Mitchell|Molina|Mollà|Monet|Moore|Morales|Moreno|Morgan|Moroz|Morozov|Morrison|Moser|Moss|Moyet|Müller|Muñoz|Murphy|Murray|Nadella|Navarro|Nemeth|Nielsen|Nightingale|Nikolić|Nilsen|Nilsson|Nimoy|Nolte|Novikov|Nowak|Nutti|O’Neill|Olofsson|Olsen|Olsson|Ora|Ortega|Ortiz|Owen|Özcan|Özdemir|Özkan|Öztürk|Pacino|Pantoliano|Paradis|Pasdar|Pataky|Paterson|Pavlov|Pavlović|Pedersen|Pérez|Persson|Pesci|Petrenko|Petrov|Petrović|Pettersen|Pettersson|Pfeiffer|Phillips|Piero|Pilatus|Pinchot|Piotrowski|Polat|Polishchuk|Popov|Price|Qemali|Quinn|Radwanska|Ramírez|Ramos|Ravelli|Rees|Reid|Reinhold|Roberts|Robertson|Robinson|Rodríguez|Romano|Romero|Ronaldo|Ross|Rossi|Rubio|Rudenko|Ruiz|Şahin|Sánchez|Sandler|Sante|Sanz|Sara|Sarandon|Savchenko|Saxon|Schmid|Schneider|Schrödinger|Schultz|Schumacher|Schwarzenegger|Scott|Seagal|Semyonov|Serrano|Sheen|Shevardnadze|Shevchenko|Shevchuk|Şimşek|Smirnov|Smith|Smyth|Sokolov|Soros|Stalin|Stallone|Stanković|Steiner|Stewart|Stojanović|Suárez|Svensson|Szymański|Taylor|Thiem|Thomas|Thompson|Thomson|Thurman|Tkachenko|Tkachuk|Torres|Torvalds|Travolta|Van Damme|Varnado|Vasilyev|Vázquez|Ventura|Vertonghen|Vettel|Volkov|Vuitton|Vygotsky|Wahlberg|Walker|Watson|Weber|White|Wiedlin|Wilberforce|Williams|Wilson|Wiśniewski|Wojciechowski|Wójcik|Wood|Woźniak|Wright|Yakovenko|Yıldırım|Yıldız|Yılmaz|Young|Z'Dar|Zane|Zaytsev|Zieliński",
		"region=asi": "Aang|Abe|Aek|Ahn|Akbar|An|Andō|Ang|Aok|Aoki|Arai|Bae|Baek|Bai|Bak|Ben|Bhak|Bùi|Bun|Cai|Cao|Cha|Chai|Chan|Chang|Chap|Chea|Cheam|Chen|Chén|Cheng|Cheon|Cheong|Cheung|Chey|Chhan|Chhem|Chhet|Chhim|Chhit|Chhorn|Chia|Chiba|Chim|Chin|Chiu|Cho|Choe|Choem|Choi|Chong|Choo|Chou|Chow|Choy|Chu|Chun|Chung|Đàm|Đặng|Đào|Deng|Din|Ding|Dith|Đỗ|Đoàn|Dong|Du|Dul|Duong|Dương|Dy|Eam|Eav|Eaw|Ek|Endō|Eom|Fan|Feng|Fujihara|Fujii|Fujita|Fujiwar|Fukuda|Gandhi|Gang|Gao|Gāo|Ghang|Ghim|Gim|Go|Goh|Goo|Gotō|Gu|Guan|Guo|Guō|Gwak|Gwon|Ha|Hà|Hah|Hak|Han|Hara|Harada|Hasegawa|Hashimoto|Hayashi|He|Hé|Heo|Her|Hirano|Ho|Hồ|Hoa|Hong|Hou|Hsieh|Hsu|Hu|Hú|Huang|Huáng|Hui|Hun|Hur|Huỳnh/Hoàng|Hwang|Iam|Ichikawa|Iem|Ikeda|Im|Imai|Inoue|Ishida|Ishii|Ishikawa|Itō|Iv|Iwasaki|Jan|Jang|Jay|Jean|Jee|Jen|Jeon|Jeong|Jey|Ji|Jiang|Jin|Jinping|Jo|Joe|Joo|Joy|Ju|Jun|Jung|Juu|Kai-shek|Kaing|Kaneko|Kang|Katō|Kawano|Kem|Keo|Kep|Khat|Khay|Kheang|Khiev|Khim|Khin|Khlot|Khúc|Kikuchi|Kim|Kimura|Kinoshita|Ko|Koak|Kobayashi|Koh|Kojima|Kōn|Kondō|Kong|Koo|Kouch|Koyam|Kuang|Kudō|Kuen|Kuy|Kwak|Kwan|Kwok|Kwon|La|Lachey|Lam|Lâm|Lau|Law|Lay|Lê|Lee|Leong|Leung|Li|Lǐ|Liang|Liao|Lim|Lin|Lín|Liu|Liú|Liv|Lo|Long|Lu|Luo|Luó|Lương|Lưu|Ly|Lý|Ma|Mǎ|Mạc|Maeda|Mah|Mai|Man|Mao|Marcos|Maruyama|Masuda|Matsuda|Matsui|Matsumoto|Mean|Meas|Mei|Meng|Min|Miura|Miyamoto|Miyasaki|Miyazak|Modi|Mon|Moon|Mori|Morita|Mul|Mun|Munn|Muoy|Murakami|Murata|Muy|Na|Nakagawa|Nakajim|Nakamura|Nakano|Nakashima|Nakayama|Nam|Nan|Ng|Ngô|Ngọ|Nguyễn|Nham|Nhek|Nishimura|No|Noguchi|Noh|Nomura|Ny|Ogawa|Oh|Ok|Okada|Okamoto|Om|Ong|Ono|Ōno|Ōta|Ōtsuka|Ouch|Oyama|Pacquiao|Pae|Pai|Paik|Pak|Pan|Pang|Park|Pech|Pei|Pen|Peng|Phak|Phạm|Phan|Phí|Phùng|Phy|Pich|Pok|Pot|Prak|Quách|Ra|Ren|Ressa|Rhee|Rhim|Rim|Roh|Ros|Rous|Rouy|Ruan|Ryang|Ryoo|Ryu|Saitō|Sakai|Sakamoto|Sakurai|Sam|San|Sang|Sano|Sao|Sar|Sasaki|Sat|Satō|Say|Seang|Sen|Seng|Seo|Seoh|Seong|Seoung|Sheen|Shen|Shibata|Shim|Shimada|Shimizu|Shin|Shong|Shung|Sieng|Sim|Sin|So|Soberano|Sohn|Sok|Som|Son|Song|Sonn|Sor|Soun|Su|Suen|Sugahara|Sugawar|Sugiyama|Suh|Sun|Sūn|Sung|Suy|Suzuki|Tạ|Taing|Takad|Takag|Takahashi|Takaki|Takata|Taked|Taketa|Takeuchi|Tamura|Tan|Tanaka|Tang|Taniguchi|Tat|Teav|Tep|Thạch|Thái|Than|Thân|Thường|Thy|Tian|Tiêu|Tô|Toch|Tok|Tong|Tống|Touch|Trác|Trần|Triệu|Trịnh|Trương|Try|Tsang|Tse|Tso|Tsui|Từ|Tum|Ty|Uch|Uchida|Ued|Ueno|Ueta|Uhm|Um|Uy|Vang|Vong|Vũ|Võ|Vương|Wada|Wang|Wáng|Watabe|Watanab|Watanabe|Wei|Wen|Wong|Woo|Wu|Wú|Xiao|Xiaoping|Xie|Xu|Xú|Xun|Yamada|Yamaguchi|Yamamoto|Yamasaki|Yamashita|Yamazak|Yang|Yáng|Yat-sen|Ye|Yeung|Yi|Yim|Yokoyama|Yoo|Yoon|Yos|Yoshida|Youn|Young|Yous|Yu|Yuan|Yuen|Yun|Zedong|Zeng|Zhan|Zhang|Zhāng|Zhao|Zhào|Zheng|Zhou|Zhōu|Zhu|Zhū|Zuu",
		"region=mde": "Abadi|Abboud|Akbar|Almasi|Amari|Antar|Antoun|Arian|Asfour|Asghar|Asker|Aswad|Atiyeh|Attia|Awad|Ba|Baba|Bahar|Basara|Baz|Bishara|Bitar|Botros|Boulos|Boutros|Cham|Dagher|Daher|Deeb|Ebadi|Essa|Fakhoury|Gadot|Ganem|Ganim|Gerges|Ghani|Ghannam|Goodanzi|Gudarzi|Guirguis|Hadad|Haddad|Haik|Hajjar|Hakimi|Halabi|Hanania|Handal|Harb|Isa|Issa|Kalb|Kanaan|Karzai|Kassab|Kassis|Kattan|Khan|Khomeini|Khouri|Khoury|Kouri|Koury|Maalouf|Maloof|Malouf|Maroun|Masih|Massoud|Mifsud|Mikhail|Moghadam|Morcos|Nader|Nahas|Naifeh|Najjar|Naser|Nassar|Nazari|Pahlavi|Quraishi|Qureshi|Rahal|Sabbag|Sabbagh|Safar|Said|Salib|Saliba|Samaha|Sarraf|Sayegh|Seif|Shadid|Shalhoub|Shammas|Shamon|Shamoon|Shamoun|Sleiman|Tahan|Tannous|Toma|Totah|Touma|Tuma|Wasem|Zogby",
		"region=afr": "Aberra|Agbaji|Aholou|Ajibola|Aregbesola|Atere|Bassinga|Bassolé|Bekale|Bhembe|Bortey|Bouabré|Boulaid|Boumal|Bouteflika|Bukenya|Cherifi|Danjuma|Dansoko|Daramy|Dludlu|Domoraud|Driwaru|El Torky|Emeagwali|Gatete|Gidey|Gwede|Gyekye|Idah|Kabbah|Kabila|Kambanda|Kamga|Kasa-Vubu|Kgosiemang|Kitenge|Kolélas|Koroma|Kwashi|Lassissi|Lihau|Lobbo|Lougué|Lumumba|Madubela|Maigari|Mandela|Marabe|Mbanefo|Mbau|Mbele|McGluwa|Megersa|Mezgebu|Mia|Moloi|Mroivili|Msipa|Mtolo|Mujuru|Muliro|Mulwana|Munganga|Munyao|Mupariwa|Mushobekwa|Musk|Mutungi|Mutyaba|Nanfuka|Ndiwa|Ndongo|Nkrumah|Nshuti|Ntambirweki|Nwokike|Nzeribe|Obama|Obetsebi|Odogwu|Odusanya|Olaniyan|Olumide|Omony|Omotoyossi|Ongwae|Osogo|Owor|Quarcoo|Sarofim|Sekhabi|Seko|Shabalala|Siakam|Sinimbo|Solanke|Sowe|Sserunkuma|Sugira|Tchomogo|Teklehaimanot|Tesfagiorgis|Thabethe|Tumwine|Turay|Twinomujuni|Umunna|Uzor"
	}
}

props.name = {
	type: "title",
	value: (data) => {
		return data.region === "asi" ? data.lastname+" "+data.firstname : data.firstname+" "+data.lastname;
	}
}

props.young = {
	hidden: true,
	value: (data) => data.age < 18
}
props.adult = {
	hidden: true,
	value: (data) => data.age >= 18
}

props.retired = {
	hidden: true,
	value: (data) => data.age > 60 && Math.random() < 0.70
}

props.agegroup = {
	type: "trait",
	value: (data) => {
		if (data.age <= 0.25) return "newborn";
		if (data.age <= 1) return "baby";
		if (data.age <= 2) return "infant";
		if (data.age <= 3) return "toddler";
		if (data.age <= 5) return "preschool";
		if (data.age <= 12) return "gradeschool";
		if (data.age <= 13) return "tweenager";
		if (data.age <= 18) return "teenager";
		if (data.age >= 75) return "senior";
		if (data.age >= 60) return "elder";
	}
}

props.gender = {
	type: "icon",
	iconFont: "Verdana, sans-serif",
	iconSize: "0.75",
	iconPos: "after",
	iconColor: (data) => data.gender === "m" ? "#59e7ff" : data.gender === "f" ? "#ff95ff" : "#deff2a",
	iconLabel: (data) => {
		if (data.young) return {m:"boy", f:"girl", x:"child"}[data.gender];
		return {m:"man", f:"woman", x:"nonbinary"}[data.gender];
	},
	icon: (data) => data.gender === "m" ? "♂" : data.gender === "f" ? "♀" : "⚲",
	value: ["m**50", "f**50", "x**1"],
}

props.region = {
	hidden: true,
	value: {
		"first=true": ["nam","eur"],
		"else": ["nam**5", "sam**3", "eur**5", "asi**3", "afr", "mde", "oce"]
	}
}


//age:
//  birthday
//	young children = no job
//	older children and adults = starter job
//  zodiac sign
//  babies have annoying traits

// us adult population: 269763509

// format name backwards in asia

props.country = {
	type: "icon",
	icon: (data) => String.fromCodePoint(
		...(data.country).toUpperCase().split('').map((char) => char.charCodeAt(0) + 127397),
	),
	iconFont: "Flags",
	iconPos: "before",
	value: {
		// for all that apply, merge dictionaries
		"region=sam": [
			"ar$$Argentina",
			"bo$$Bolivia",
			"br$$Brazil**3",
			"cl$$Chile",
			"co$$Colombia",
			"ec$$Ecuador",
			"fk$$Falkland Islands",
			"gf$$French Guiana",
			"gy$$Guyana",
			"py$$Paraguay",
			"pe$$Peru",
			"sr$$Suriname",
			"uy$$Uruguay",
			"ve$$Venezuela",
			"ag$$Antigua and Barbuda",
			"bs$$Bahamas",
			"bb$$Barbados",
			"bm$$Bermuda",
			"bz$$Belize",
			"vg$$British Virgin Islands",
			"ky$$Cayman Islands",
			"cr$$Costa Rica",
			"cu$$Cuba",
			"dm$$Dominica",
			"do$$Dominican Republic",
			"sv$$El Salvador",
			"gd$$Grenada",
			"gp$$Guadeloupe",
			"gt$$Guatemala",
			"ht$$Haiti",
			"hn$$Honduras",
			"jm$$Jamaica",
			"mq$$Martinique",
			"ms$$Montserrat",
			"cw$$Curaçao",
			"aw$$Aruba",
			"sx$$Sint Maarten",
			"bq$$Bonaire",
			"ni$$Nicaragua",
			"pa$$Panama",
			"pr$$Puerto Rico",
			"bl$$Saint Barthelemy",
			"kn$$Saint Kitts and Nevis",
			"ai$$Anguilla",
			"lc$$Saint Lucia",
			"mf$$Saint Martin",
			"pm$$Saint Pierre and Miquelon",
			"vc$$Saint Vincent and the Grenadines",
			"tt$$Trinidad and Tobago",
			"tc$$Turks and Caicos"
		],

		"region=oce": [
			"as$$American Samoa",
			"au$$Australia",
			"sb$$Solomon Islands",
			"ck$$Cook Islands",
			"fj$$Fiji",
			"pf$$French Polynesia",
			"ki$$Kiribati",
			"gu$$Guam",
			"nr$$Naoero",
			"nc$$New Caledonia",
			"vu$$Vanuatu",
			"nz$$New Zealand",
			"nu$$Niue",
			"nf$$Norfolk Island",
			"mp$$Northern Mariana",
			"um$$US Minor Outlying Islands",
			"fm$$Micronesia",
			"mh$$Marshall Islands",
			"pw$$Palau",
			"pg$$Papua New Guinea",
			"pn$$Pitcairn Islands",
			"tk$$Tokelau",
			"to$$Tonga",
			"tv$$Tuvalu",
			"wf$$Wallis and Futuna",
			"ws$$Samoa"
		],

		"region=nam": [
			"gl$$Greenland",
			"mx$$Mexico**4",
			"ca$$Canada**4",
			"us$$United States**4",
			"vi$$US Virgin Islands"
		],

		"region=eur": [
			"al$$Albania",
			"ad$$Andorra",
			"at$$Austria",
			"be$$Belgium",
			"ba$$Bosnia and Herzegovina",
			"bg$$Bulgaria",
			"by$$Belarus",
			"hr$$Croatia",
			"cz$$Czech Republic",
			"dk$$Denmark",
			"ee$$Estonia",
			"fo$$Faroe Islands",
			"fi$$Finland",
			"ax$$Åland Islands",
			"fr$$France",
			"de$$Germany",
			"gi$$Gibraltar",
			"gr$$Greece",
			"va$$Vatican City",
			"hu$$Hungary",
			"is$$Iceland",
			"ie$$Ireland",
			"it$$Italy",
			"xk$$Kosovo",
			"lv$$Latvia",
			"li$$Liechtenstein",
			"lt$$Lithuania",
			"lu$$Luxembourg",
			"mt$$Malta",
			"mc$$Monaco",
			"md$$Moldova",
			"me$$Montenegro",
			"nl$$Netherlands",
			"no$$Norway",
			"pl$$Poland",
			"pt$$Portugal",
			"ro$$Romania",
			"ru$$Russia",
			"sm$$San Marino",
			"rs$$Serbia",
			"sk$$Slovakia",
			"si$$Slovenia",
			"es$$Spain",
			"sj$$Svalbard & Jan Mayen",
			"se$$Sweden",
			"ch$$Switzerland",
			"ua$$Ukraine",
			"mk$$North Macedonia",
			"gb$$United Kingdom",
			"gg$$Guernsey",
			"je$$Jersey",
			"im$$Isle of Man"
		],

		"region=asi": [
			"bd$$Bangladesh",
			"am$$Armenia",
			"bt$$Bhutan",
			"bn$$Brunei",
			"mm$$Myanmar",
			"kh$$Cambodia",
			"lk$$Sri Lanka",
			"cn$$China",
			"tw$$Taiwan",
			"cx$$Christmas Island",
			"cc$$Cocos (Keeling) Islands",
			"cy$$Cyprus",
			"ge$$Georgia",
			"hk$$Hong Kong",
			"in$$India",
			"id$$Indonesia",
			"jp$$Japan",
			"kp$$North Korea",
			"kr$$South Korea",
			"la$$Laos",
			"mo$$Macao",
			"my$$Malaysia",
			"mv$$Maldives",
			"mn$$Mongolia",
			"np$$Nepal",
			"ph$$Philippines",
			"tl$$Timor-Leste",
			"sg$$Singapore",
			"vn$$Vietnam",
			"th$$Thailand"
		],

		"region=mde": [
			"af$$Afghanistan",
			"az$$Azerbaijan",
			"bh$$Bahrain",
			"ir$$Iran",
			"iq$$Iraq",
			"il$$Israel",
			"kz$$Kazakhstan",
			"jo$$Jordan",
			"kw$$Kuwait",
			"om$$Oman",
			"kg$$Kyrgyzstan",
			"lb$$Lebanon",
			"pk$$Pakistan",
			"ps$$Palestine",
			"qa$$Qatar",
			"sa$$Saudi Arabia",
			"sy$$Syria",
			"tr$$Türkiye",
			"tj$$Tajikistan",
			"tm$$Turkmenistan",
			"ae$$United Arab Emirates",
			"uz$$Uzbekistan",
			"ye$$Yemen",
		],

		"region=ant": [
			"aq$$Antarctica"
		],

		"region=afr": [
			"dz$$Algeria",
			"ao$$Angola",
			"bw$$Botswana",
			// "io$$British Indian Ocean Territory",
			"bi$$Burundi",
			"cm$$Cameroon",
			"cv$$Cape Verde",
			"cf$$Central African Republic",
			"td$$Chad",
			"km$$Comoros",
			"yt$$Mayotte",
			"cg$$Congo",
			"cd$$Congo",
			"bj$$Benin",
			"gq$$Equatorial Guinea",
			"et$$Ethiopia",
			"er$$Eritrea",
			// "tf$$French Southern Territories",
			"dj$$Djibouti",
			"ga$$Gabon",
			"gm$$Gambia",
			"gh$$Ghana",
			"gn$$Guinea",
			"ci$$Côte d'Ivoire",
			"ke$$Kenya",
			"ls$$Lesotho",
			"lr$$Liberia",
			"ly$$Libya",
			"mg$$Madagascar",
			"mw$$Malawi",
			"ml$$Mali",
			"mr$$Mauritania",
			"mu$$Mauritius",
			"ma$$Morocco",
			"mz$$Mozambique",
			"na$$Namibia",
			"ne$$Niger",
			"ng$$Nigeria",
			"gw$$Guinea-Bissau",
			"re$$Réunion",
			"rw$$Rwanda",
			"sh$$Saint Helena",
			"st$$São Tomé and Príncipe",
			"sn$$Senegal",
			"sc$$Seychelles",
			"sl$$Sierra Leone",
			"so$$Somalia",
			"za$$South Africa",
			"zw$$Zimbabwe",
			"ss$$South Sudan",
			"sd$$Sudan",
			"eh$$Sahrawi Republic",
			"sz$$Eswatini",
			"tg$$Togo",
			"tn$$Tunisia",
			"ug$$Uganda",
			"eg$$Egypt",
			"tz$$Tanzania",
			"bf$$Burkina Faso",
			"zm$$Zambia"
		]
	}
}

props.job = {
	type: "trait",
	value: {
		"young=true": null,
		"retired=true": "retired",
		"else": [
			"unemployed**10",
			"student**10",
			"prisoner",
			"nurse|teacher|college professor|pharmacist|doctor|chiropractor|therapist|dentist|veterinarian",
			"funeral director|nursing home",
			"mechanic|engineer|scientist|marine biologist|mathematician|data center engineer",
			"police${g:man,woman, officer}|fire${g:man,woman,fighter}|lifeguard|traffic cop",
			"judge|lawyer|public defender|prosecutor|local politician|congress${g:man,woman,person}|lobbyist|military general|military troop|labor unionist|social worker",
			{
				"region=mde": "imam",
				"else": "priest|rabbi|imam"
			},
			"banker|CEO|millionaire|billionaire|healthcare executive|pharmaceutical executive|insurance agent|tech executive|sales${g:man,woman,person}|crypto investor|investor|stockbroker|memecoin developer|entrepreneur",
			"programmer|game developer|artist|conlanger|tech ${g:bro,sis,person}|AI developer",
			"painter|writer|${g:actor,actress,actor}|woodworker|photographer|gardener|landscaper|taxidermist|blacksmith|construction worker|librarian",
			"news anchor|journalist|weather${g:man,woman,person}|podcaster|YouTuber|TikToker|livestreamer|influencer|VTuber|gamer|esports pro|Reddit mod|Discord mod|SoundCloud rapper|meme page owner",
			"janitor|delivery${g:man,woman,person}|cashier|dishwasher|chef|${g:waiter,waitress,server}|farmer|${g:hunter,huntress,hunter}|bartender|bodyguard|customer service|${g:housekeeper,maid,cleaner}",
			{
				"country=kr": "k-pop idol**50"
			},
			{
				"first=false": "professional thief|gang member|scammer|con artist|spam caller|arsonist|fraudster|assassin|bank robber|hacker|cybercriminal|pirate"
			},
			"athlete"
		]
	}
}

props.degree = {
	value: {
		"job=student": "CompSci|business|economics|engineering|film production|journalism|education|sociology|communications|anthropology|theology|archeology|marine biology|data science|accounting|finance|psychology|nursing"
	}
}

props.handedness = {
	type: "trait",
	chance: 0.1,
	value: "left-handed"
}
props.homeless = {
	type: "trait",
	chance: 0.037,
	value: "unhoused"
}
props.orphan = {
	type: "trait",
	check: data => data.age < 18,
	chance: 0.02,
	value: "orphan"
}
props.eldermillennial = {
	type: "trait",
	check: data => (new Date(data.born)).getFullYear() === 1984,
	value: "elder millennial"
}
props.diet = {
	type: "trait",
	chance: 0.01,
	value: ["vegetarian","vegan"]
}

props.anniversary = {
	type: "blurb",
	check: data => data.age > 16,
	chance: 1/365,
	value: "Today is ${g:his,her,their} anniversary!"
}
props.fired = {
	type: "blurb",
	check: data => data.job === "unemployed",
	chance: 1/365*10,
	value: "Got fired from ${g:his,her,their} job today."
}
props.student = {
	type: "blurb",
	check: data => data.job === "student" && data.age > 17,
	chance: 1/365/4,
	value: "Graduating ${c:today,tonight}."
}
props.hospital = {
	type: "blurb",
	chance: 0.01,
	value: "Currently hospitalized"
}
props.bald = {
	type: "trait",
	check: data => data.age >= 18 && (data.gender === "m" || Math.random() < 0.1),
	chance: 0.05,
	value: "bald"
}

props.opinion = {
	type: "desc",
	unique: true,
	// chance: 0.95,
	check: data => data.age >= 13 && (data.first || Math.random() < 0.95),
	value: [
		"Prefers to eat fruit warm",
		"Prefers to eat pizza cold",
		"Prefers drinking raw milk",
		"Loves sharing gossip or drama",
		"Enjoys starting fake rumors",
		"Will never admit ${g:he's,she's,they're} wrong",
		"Starts debates about everything",
		"Would watch you play video games",
		"Always makes it about ${g:him,her,them}self",
		"Still uses a sippy cup",
		"Believes in the supernatural",
		"Doesn't believe in ghosts",
		"Has a fear of clowns",
		"Interrupts people mid-sentence",
		"Always acts like the victim",
		"Thinks ${g:he knows,she knows,they know} everything, but ${g:doesn't,doesn't,don't}",
		"Leader of ${g:his,her,their} friend group",
		"Has poor social skills",
		"Way too confident",
		"Way too outgoing",
		{ "first=false": [
			"Has zero rizz",
			"Has some outdated beliefs",
			"Has a \"dark\" sense of humor",
			"The \"alpha male\"",
			"Chronically online",
			"Genuinely just a great ${g:guy,gal,person}",
			"Just a straight-up evil ${g:guy,gal,person}",
			"Plays Wordslop daily",
			"Did not care for The Godfather",
			"Cringe, but free",
			"Always sounds passive-aggressive",
			"Speaks with a monotone voice",
			"Walks slowly in front of you",
			"Stands up to bullies",
			"Taps their foot while working",
			"Puts literally everything on ${g:his,her,their} bagel",
			"Hears \"${c:yanny,laurel,green needle,brainstorm}\"",
		]},
		{ "adult=true": [
			"Uses turn signals",
			"Blasts music while on the road",
			"Drives a very loud car",
			"Speeds in school zones",
			{ "gender=m": [
				"Keeps his distance at the urinals",
			]},
		]},
		{ "agegroup=teenager": [
			"Already has a driver's license",
		]},
		"Always in a bad mood",
		"Always in a good mood",
		"Cries at the movie theater",
		"Never cries during movies",
		"Acts humble, but isn't",
		"Always does \"${g:his,her,their} own research\"",
		"Desperate for compliments",
		"Uses goggles in the pool",
		"Pours milk before the cereal",
		"Pours cereal before the milk",
		"Buys a coffee every day",
		"Doesn't have a sense of humor",
		"Jumps off the last few stairs",
		"Walks up stairs two steps at a time",
		"Always late to events",
		"Always shows up on time",
		"Would never use AI to cheat",
		"Opens the door for strangers",
		"Doesn't get the door for strangers",
		"Rude to restaurant workers",
		"Doesn't leave tips",
		"Always leaves a large tip",
		"Whines over a minor inconvenience",
		"Disrespectful to ${g:his,her,their} parents",
		"Teacher's pet",
		"Class clown",
		"Snores loudly at night",
		"Easily frightened at sudden noises",
		"Does viral TikTok dances",
		"Answers texts quickly",
		"Takes days to answer texts",
		"Has 1${c:0,1,2,3,4,5,6,7,8,9},000 unread emails",
		"Has never told a lie",
		"Admits when ${g:he's,she's,they're} wrong",
		"Brutally honest when asked",
		"Kind and empathetic",
		"Embarrassed to ask for help",
		"Needs help reaching above the fridge",
		"Considers all perspectives of an issue",
		"Likes pineapple on pizza",
		"Hates pineapple on pizza",
		"Prefers dark chocolate",
		"Constantly quotes TikToks",
		"Unironically says \"mogged\"",
		"Has really long nails",
		"Eats steak with ketchup",
		"Eats cereal without milk",
		"Still uses wired earbuds",
		"Always presses \"accept all cookies\"",
		"Eats onions like an apple",
		"Eats bananas with the peel",
		"Takes a walk every day",
		"Prefers Coke over Pepsi",
		"Picks up every unknown phone call",
		"Is a morning person",
		"Listens to podcasts",
		"Refuses to engage in small talk",
		"Likes daylight savings time",
		"Talks at the movie theater",
		"Dips fries in their milkshake",
		"Has never traveled abroad",
		"Clicks on every single ad",
		"Doesn't have a favorite color",
		"Thinks goldfish are useless pets",
		"Makes the plans for the friend group",
		"Thinks anything is possible if you try",
		"Leaves the toilet seat up",
		"Judges books by their cover",
		"Falls asleep during ${c:baseball,football,soccer,basketball} games",
		"Prefers boneless chicken wings",
		"Thinks audiobooks count as reading",
		"Eats burgers with peanut butter",
		"Texts in all lowercase",
		"Cuts sandwiches horizontally",
		"Reads all the Terms & Conditions",
		"Clicks every suspicious link",
		"Cracks ${g:his,her,their} knuckles too often",
		"Thinks school is pointless",
		"Thinks the egg came before the chicken",
		"Wets ${g:his,her,their} toothbrush after applying paste",
		"Refuses to make eye contact",
		"Is a night owl",
		"Got low test scores in school",
		"Thinks cereal is a soup",
		"Brings gifts to hangouts",
		"Considers hotdogs a sandwich",
		"Doesn't take naps, ever",
		"Likes chunky sauces more than smooth",
		"Always pays the bill at dinner",
		"Has never read a book in full",
		"Cancels plans at the last minute",
		"Only eats the edge-piece brownies",
		"Prefers Android over iPhone",
		"Says that water is wet",
		"Has a hard time speaking loud",
		"Makes typos in every sentence",
		"Pronounces GIF like \"jiff\"",
		"Chews on gum... loudly",
		"Dips pizza in ranch",
		"Overshares, but only when provoked",
		"Has trust issues",
		"Allergic to ${c:milk,eggs,peanuts,almonds,nuts,soy,gluten,shellfish,bees,fish,sesame}",
	]
}

props.hobby = {
	type: "desc",
	unique: true,
	chance: 0.1,
	check: data => data.age >= 8,
	display: data => choose(["Likes","Loves","REALLY likes","Dislikes","Hates","Obsessed with"])+" "+data.hobby,
	value: [
		"reading",
		"swimming",
		"${c:walking,hiking,running,jogging}",
		"${c:astrology,tarot readings}",
		"playing ${c:basketball,baseball,soccer,football,cricket,hockey,badminton,tennis,volleyball,golf,disc golf}",
		"archery",
		"cave diving",
		"archiving",
		"lost media",
		"citizen science",
		"flying kites",
		"politics",
		"gemstones",
		"vexillology",
		"collecting ${c:coins,stamps,whiskers,soda cans,condiment packets,toys,license plates,dice,rocks}",
		"${c:surfing,longboarding,snowboarding}",
		"${c:biking,bicycling,skateboarding}",
		"playing the ${c:piano,guitar,violin,drums,flute,sax,trumpet,trombone,clarinet,cello,bass,harp,harmonica,ukulele}",
		"yo-yoing",
		"metal detecting",
		"magnet fishing",
		"Dubai chocolate",
		"origami",
		"grave digging",
		"mushroom harvesting",
		"${c:sewing,knitting,crochet}",
		"hobby horsing",
		"LARPing",
		"mukbang",
		"flea markets",
		"balloon animals",
		"traveling",
		"comic books",
		"anime",
		"manga",
		"birdwatching",
		"gambling",
		"dogs**3",
		"cats**3",
		"airline food",
		"reality TV",
		"sports",
		"country music",
		"K-pop",
		"brainrot",
		"candy corn",
		"AI art"
	]
}

props.opinionBaby = {
	type: "desc",
	unique: true,
	// chance: 0.95,
	check: data => data.age <= 8,
	value: [
		"Interested in blocks",
		"Chews on everything",
		"Cries loudly",
		"Almost never cries",
		"Coughs loudly",
		"Drools everywhere",
		"Very snotty"
	]
}

// https://onlinetools.com/tsv/convert-tsv-to-json
SPA.data.celebs = [{"name":"Elon Musk","gender":"m","country":"us","born":"1971-06-28","job":"CEO of Tesla","trait":"billionaire","desc":"Obsessed with Reddit"},{"name":"IShowSpeed","gender":"m","country":"us","born":"2005-01-21","job":"livestreamer","trait":"athletic","desc":"Likes soccer"},{"name":"Adam Conover","gender":"m","country":"us","born":"1983-03-02","job":"comedian","trait":"intelligent","desc":"He ruins everything"},{"name":"Adrian Christian Hernandez","gender":"m","country":"us","job":"villain","desc":"Called \"A\" by the locals"},{"name":"Ana de Armas","gender":"f","country":"cu","born":"1988-04-30","job":"actress","desc":"Oscar nominee"},{"name":"Andrew Horowitz","gender":"m","country":"us","born":"1983-10-12","job":"keyboardist","desc":"Member of Tally Hall"},{"name":"Anne Hathaway","gender":"f","country":"us","born":"1982-11-12","job":"actress","desc":"Emmy Award winner"},{"name":"Ariana Grande","gender":"f","country":"us","born":"1993-06-26","job":"singer|actress","desc":"Very successful musician"},{"name":"Awsten Knight","gender":"m","country":"us","born":"1992-01-17","job":"rock vocalist","desc":"Has dyed hair"},{"name":"Barack Obama","gender":"m","country":"us","born":"1961-08-04","job":"former president","desc":"Loves eating almonds"},{"name":"Bill Gates","gender":"m","country":"us","born":"1955-10-28","job":"founder of Microsoft","trait":"billionaire","desc":"Loves computer programming"},{"name":"Bill Wurtz","gender":"m","country":"us","born":"1989-12-08","job":"singer|YouTuber","desc":"Knows a lot about Japan"},{"name":"Count Binface","gender":"m","country":"gb","born":"1980-02-23","job":"politician","desc":"Wears a rubbish bin as a helmet"},{"name":"Brian Eno","gender":"m","country":"gb","born":"1948-05-15","job":"musician","desc":"Makes ambient music"},{"name":"Britney Spears","gender":"f","country":"us","born":"1981-12-02","job":"singer","desc":"Known as the \"Princess of Pop\""},{"name":"Buzz Aldrin","gender":"m","country":"us","born":"1930-01-20","job":"astronaut","desc":"Second to walk on the Moon"},{"name":"CarterPCs","gender":"m","country":"us","born":"2005-08-08","job":"YouTuber","desc":"Reviews technology products"},{"name":"Cary Huang","gender":"m","country":"us","born":"1997-03-18","job":"YouTuber|animator","trait":"twin","desc":"Known for popularizing object shows"},{"name":"Cheesy Hfj","gender":"m","country":"us","born":"2004-05-01","job":"YouTuber|animator","desc":"Creator of \"ONE\""},{"name":"Cristiano Ronaldo","gender":"m","country":"pt","born":"1985-02-05","job":"soccer player","desc":"FIFA World Player of the year"},{"name":"Christina Koch","gender":"f","country":"us","born":"1979-01-29","job":"astronaut","desc":"Flew around the Moon"},{"name":"Conan O'Brien","gender":"m","country":"us","born":"1963-04-18","job":"TV host|comedian","desc":"Victim of mafia violence"},{"name":"Dan Castellaneta","gender":"m","country":"us","born":"1957-10-29","job":"actor|comedian","desc":"Voice of Homer Simpson"},{"name":"Dan Salvato","gender":"m","country":"us","born":"1991-12-23","job":"game developer","desc":"Creates visual horror novels"},{"name":"Danno Cal","gender":"m","country":"us","born":"2004-07-01","job":"YouTuber|animator","desc":"Loves mango energy drinks"},{"name":"David Attenborough","gender":"m","country":"us","born":"1926-05-08","job":"environmentalist","desc":"Voices over nature documentaries"},{"name":"Doggie","gender":"m","country":"us","born":"2006-04-05","job":"Geometry Dash player","desc":"Beat the infamous \"GRIEF\" level"},{"name":"Donald Trump","gender":"m","country":"us","born":"1946-06-14","job":"actor","trait":"spray-tanned","desc":"Known for role in \"Home Alone\""},{"name":"Donald Tusk","gender":"m","country":"pl","born":"1957-04-22","job":"prime minister","desc":"No relation"},{"name":"Drake","gender":"m","country":"ca","born":"1986-10-24","job":"rapper","trait":"silly","desc":"Loves fresh-baked pie"},{"name":"Dwayne Johnson","gender":"m","country":"us","born":"1972-05-02","job":"wrestler|actor","trait":"bald"},{"name":"Emma Stone","gender":"f","country":"us","born":"1988-11-06","job":"actress","desc":"Broke her arms in gymnastics"},{"name":"Eric Idle","gender":"m","country":"gb","born":"1943-03-29","job":"comedian|actor","desc":"Sang for Queen Elizabeth II"},{"name":"Fernanfloo","gender":"m","country":"sv","born":"1993-07-07","job":"YouTuber|gamer"},{"name":"Frank Iero","gender":"m","country":"us","born":"1981-10-31","job":"rock vocalist","desc":"Singer for My Chemical Romance"},{"name":"Gabe Newell","gender":"m","country":"us","born":"1962-11-03","job":"game developer|CEO","desc":"Founder of Valve"},{"name":"Gerard Way","gender":"m","country":"us","born":"1977-04-09","job":"rock vocalist","desc":"Singer for My Chemical Romance"},{"name":"Gigi Perez","gender":"f","country":"us","born":"2000-02-04","job":"singer","desc":"Creator of viral TikTok songs"},{"name":"Gordon Ramsay","gender":"m","country":"gb","born":"1966-11-08","job":"professional chef","desc":"Has a black belt in karate"},{"name":"GrayStillPlays","gender":"m","country":"us","job":"gaming YouTuber","desc":"Looks like a dad"},{"name":"Hayley Williams","gender":"f","country":"us","born":"1988-12-27","job":"rock vocalist","desc":"Singer for Paramore"},{"name":"Hideo Kojima","gender":"m","country":"jp","born":"1963-08-24","job":"game developer","desc":"Most followed video game director"},{"name":"Hikaru Nakamura","gender":"m","country":"us","born":"1987-12-09","job":"chess grandmaster","desc":"Top chess player in the United States"},{"name":"Hugh Jackman","gender":"m","country":"au","born":"1968-10-12","job":"actor|singer","desc":"Formerly a PE teacher"},{"name":"Jack Black","gender":"m","country":"us","born":"1969-08-28","job":"actor|comedian","desc":"He is Steve"},{"name":"Jamie Paige","gender":"f","country":"us","job":"musician","trait":"birdbrain","desc":"Creates songs with voice synthesis"},{"name":"Jay Kay","gender":"m","country":"gb","born":"1969-12-30","job":"singer","desc":"Owns three Mercedes-Benz cars"},{"name":"jeff bezos","gender":"m","country":"us","born":"1964-01-12","job":"founder of Amazon","trait":"billionaire","desc":"Makes $3,000 every second"},{"name":"Jens Bergensten","gender":"m","country":"se","born":"1979-05-18","job":"game developer at Mojang","desc":"Lead designer for Minecraft"},{"name":"Jerma985","gender":"m","country":"us","born":"1985-09-22","job":"livestreamer|actor","desc":"Makes funny faces"},{"name":"Joe Biden","gender":"m","country":"us","born":"1942-11-20","job":"former president","desc":"Prefers vanilla ice cream"},{"name":"Johannes Rojola","gender":"m","country":"fi","job":"game developer","desc":"Makes LEGO stop motion animations"},{"name":"John Cena","gender":"m","country":"us","born":"1977-04-23","job":"actor|wrestler","desc":"We're not sure where he went"},{"name":"John Mulaney","gender":"m","country":"us","born":"1982-08-26","job":"comedian","desc":"Great-grandchild of a mayor"},{"name":"Kane Parsons","gender":"m","country":"us","born":"2005-06-18","job":"filmmaker|YouTuber","desc":"Formerly 20 years old"},{"name":"Kanye West","gender":"m","country":"us","born":"1977-06-08","job":"rapper","desc":"Car crash victim"},{"name":"Katy Perry","gender":"f","country":"us","born":"1984-10-25","job":"singer|songwriter","desc":"Smurf voice actress"},{"name":"Kendrick Lamar","gender":"m","country":"us","born":"1987-06-17","job":"rapper","desc":"Performed at the Super Bowl"},{"name":"Kevin Bacon","gender":"m","country":"us","born":"1958-07-08","job":"actor","desc":"Scam victim"},{"name":"Kim Kardashian","gender":"f","country":"us","born":"1980-10-21","job":"celebrity"},{"name":"Charles III","gender":"m","country":"us","born":"1948-11-14","job":"king","desc":"Victim of school bullying"},{"name":"Krao","gender":"m","country":"es","born":"1992-02-22","job":"YouTuber","desc":"Records Roblox videos"},{"name":"KreekCraft","gender":"m","country":"us","born":"1997-01-28","job":"YouTuber","desc":"Expert in Roblox"},{"name":"Kwebbelkop","gender":"m","country":"us","born":"1995-06-01","job":"YouTuber","desc":"Might just be an AI now"},{"name":"Linus Torvalds","gender":"m","country":"fi","born":"1969-12-28","job":"software engineer","desc":"Has an asteroid named after him"},{"name":"Magnus Carlsen","gender":"m","country":"no","born":"1990-11-30","job":"chess grandmaster","desc":"Solved jigsaw puzzles as a toddler"},{"name":"Mark Fischbach","gender":"m","country":"us","born":"1989-06-28","job":"YouTuber|filmmaker","desc":"Son of a nurse"},{"name":"Matthew Patrick","gender":"m","country":"us","born":"1986-11-15","job":"game theorist|YouTuber","desc":"Prefers Diet Coke"},{"name":"Michael Jordan","gender":"m","country":"us","born":"1963-02-17","job":"basketball player","desc":"Has a fear of the water"},{"name":"Mick Jagger","gender":"m","country":"gb","born":"1943-07-26","job":"musician","desc":"Has the moves"},{"name":"MrBeast","gender":"m","country":"us","born":"1998-05-07","job":"YouTuber","desc":"Has a chocolate bar company"},{"name":"Nick DiGiovanni","gender":"m","country":"us","born":"1996-05-19","job":"chef|YouTuber","desc":"World record holder for largest cake-pop"},{"name":"NileRed","gender":"m","country":"ca","born":"1991-09-07","job":"chemist|YouTuber","desc":"Has turned plastic gloves into grape soda"},{"name":"Ryan Letourneau","gender":"m","country":"ca","born":"1988-11-28","job":"livestreamer","trait":"bald","desc":"Three-time Streamer Awards nominee"},{"name":"Markus Persson","gender":"m","country":"se","born":"1979-06-01","job":"game developer","trait":"billionaire","desc":"Created a block game"},{"name":"Paul McCartney","gender":"m","country":"gb","born":"1942-06-18","job":"bassist","desc":"Former member of the Beatles"},{"name":"Pedro Pascal","gender":"m","country":"cl","born":"1975-04-02","job":"actor","desc":"Drinks pure espresso on ice"},{"name":"Felix Kjellberg","gender":"m","country":"se","born":"1989-10-24","job":"YouTuber","desc":"Has a council of AI agents"},{"name":"Pope Leo XIV","gender":"m","country":"va","born":"1955-09-14","job":"pope","desc":"Fan of the Chicago White Sox"},{"name":"Vladimir Putin","gender":"m","country":"ru","born":"1952-10-07","job":"president","trait":"balding","desc":"Judo record-breaker"},{"name":"Rebecca Sugar","gender":"x","country":"us","born":"1987-07-09","job":"animator","desc":"Her birthstone is a ruby"},{"name":"Rihanna","gender":"f","country":"bb","born":"1988-02-20","job":"singer|actress","desc":"She writes her own music"},{"name":"Ryan Reynolds","gender":"m","country":"ca","born":"1976-10-23","job":"actor","desc":"Former car thief"},{"name":"Samuel L. Jackson","gender":"m","country":"us","born":"1948-12-21","job":"actor","desc":"Almost became a marine biologist"},{"name":"Scott Cawthon","gender":"m","country":"us","born":"1978-06-04","job":"game developer|author","desc":"Highly secretive"},{"name":"Shigeru Miyamoto","gender":"m","country":"jp","born":"1952-11-16","job":"game developer","desc":"Doesn't play video games"},{"name":"András Arató","gender":"m","country":"hu","born":"1945-07-11","job":"electrical engineer","desc":"Smiles through the pain"},{"name":"Joseph Garrett","gender":"m","country":"gb","born":"1990-12-13","job":"YouTuber","desc":"Has a cat alter ego"},{"name":"Stevie Wonder","gender":"m","country":"us","born":"1950-05-13","job":"singer|songwriter","trait":"blind","desc":"Musical child prodigy"},{"name":"Tyler Folse","gender":"m","country":"us","job":"content creator|nuclear scientist","desc":"Knows a lot about nuclear physics"},{"name":"Taylor Swift","gender":"f","country":"us","born":"1989-12-13","job":"singer|songwriter","desc":"Was in two car accidents in one day"},{"name":"Toby Fox","gender":"m","country":"us","born":"1991-10-11","job":"game developer|composer","desc":"Self-taught musician"},{"name":"Tom Holland","gender":"m","country":"gb","born":"1996-06-01","job":"actor","desc":"Bullied for learning ballet"},{"name":"Tom Kenny","gender":"m","country":"us","born":"1962-07-13","job":"actor|comedian","desc":"Voice of SpongeBob SquarePants"},{"name":"Travis Scott","gender":"m","country":"us","born":"1991-04-30","job":"rapper|songwriter","desc":"Has a Fortnite skin"},{"name":"JD Vance","gender":"m","country":"us","born":"1984-08-02","job":"vice president|author","desc":"Like classic rock music"},{"name":"Michael Stevens","gender":"m","country":"us","born":"1986-01-23","job":"YouTuber|educator","desc":"Locked himself in an isolation chamber"},{"name":"Weird Al Yankovic","gender":"m","country":"us","born":"1959-10-23","job":"musician|comedian","desc":"Makes Al-generated music"},{"name":"Will Wood","gender":"m","country":"us","born":"1993-06-26","job":"singer|author|painter","desc":"He wood"},{"name":"Xi Jinping","gender":"m","country":"cn","born":"1953-06-15","job":"president|chairman","desc":"Once lived inside a cave"},{"name":"Yoko Ono","gender":"f","country":"jp","born":"1933-02-18","job":"musician|activist","desc":"REALLY likes the sky"},{"name":"Zach Hadel","gender":"m","country":"us","born":"1993-03-04","job":"animator|YouTuber","desc":"Inspired by SpongeBob SquarePants and Dragon Ball Z"},{"name":"Zendaya","gender":"f","country":"us","born":"1996-09-01","job":"actress|singer","desc":"Former Kidz Bop star"},{"name":"Zohran Mamdani","gender":"m","country":"us","born":"1991-10-18","job":"mayor|rapper","desc":"Ran a marathon twice"},{"name":"Simone Biles","gender":"f","country":"us","born":"1997-03-14","job":"gymnast","desc":"Winner of countless medals"},{"name":"Melinda Gates","gender":"f","country":"us","born":"1964-08-15","job":"businesswoman|philanthropist","desc":"Has donated over a billion dollars"},{"name":"Kamala Harris","gender":"f","country":"us","born":"1964-10-20","job":"former vice president","desc":"Loves reading and cooking"},{"name":"Oprah Winfrey","gender":"f","country":"us","born":"1954-01-29","job":"TV host","trait":"billionaire","desc":"Presidential Medal of Freedom holder"},{"name":"Michelle Obama","gender":"f","country":"us","born":"1964-01-17","job":"attorney|former first lady","desc":"Has a sociology degree"},{"name":"PaymoneyWubby","gender":"m","country":"us","born":"1995-07-08","job":"livestreamer","desc":"Loves video games"},{"name":"Squeex","gender":"m","country":"us","born":"1993-09-27","job":"livestreamer","trait":"balding","desc":"Loves roleplaying"},{"name":"ohnePixel","gender":"m","country":"de","born":"1998-05-11","job":"livestreamer","trait":"gamer","desc":"Loves gambling"},{"name":"Vinny Vinesauce","gender":"m","country":"us","born":"1985-05-12","job":"livestreamer","trait":"musician","desc":"Great at voice impressions"},{"name":"Joe Bartolozzi","gender":"m","country":"us","born":"2002-02-06","job":"livestreamer","trait":"gamer","desc":"Has a low temper"},{"name":"Ludwig Ahgren","gender":"m","country":"us","born":"1995-07-06","job":"livestreamer","trait":"podcaster","desc":"Has a dance named after him"},{"name":"Jack Massey Welsh","gender":"m","country":"gb","born":"1996-06-24","job":"YouTuber","trait":"gamer","desc":"He sucks at life"},{"name":"CaseOh","gender":"m","country":"us","born":"1998-05-09","job":"livestreamer","desc":"Obsessed with food"}];

SPA.data.specials = {
"m": {name: "Your Mother",gender: "f"},
"f": {name: "Your Father",gender: "m"},
"b": {name: "Your Bestie"},
"c": {name: "Your Crush"},
"s": {name: "Yourself", blurb:"The person reading this"},
"e": {name: "Your school bully", blurb:"You knew them"},
}



/*
doPropValue(
	{"job=student":["economics","business"], "job=dev":["game","software"]},
	{job:"student"}
);

let humans = [];
for (let i = 0; i < 1000; i++) {
    humans.push(generateHuman())
}
humans;
*/