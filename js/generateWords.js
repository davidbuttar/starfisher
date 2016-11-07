var generateWords = function(){
    var that = {};
    var words = [
        [{'score':79.6891050244722,'term':'Hillary'}, {'score':32.0767293657555,'term':'president'}, {'score':30.4316496541423,'term':'Chagoury'}],
        [{'score':16.5527306935874,'term':'Mittman'},{'score':16.4472653692226,'term':'PunditFact'},{'score':16.1416469637272,'term':'Exposed'}],
        [{'score':14.3278890654249,'term':'Foundation'},{'score':14.1183369218536,'term':'Bill'}, {'score':13.8761327631541,'term':'Committee'}],
        [{'score':13.1159781451632,'term':'Election'},{'score':12.9166434999403,'term':'Fox'}, {'score':12.8661195593877,'term':'Obama'}],
        [{'score':13.1159781451632,'term':'emails'},{'score':12.9166434999403,'term':'scandal'}, {'score':12.8661195593877,'term':'polls'}],
        [{'score':13.1159781451632,'term':'trump'},{'score':12.9166434999403,'term':'policy'}, {'score':12.8661195593877,'term':'FBI'}],
    ];

    var genericWords = [{'score':13.1159781451632,'term':'bla'},{'score':12.9166434999403,'term':'babble'}, {'score':12.8661195593877,'term':'jabber'}];

    
    var personas = [
        {'count':16,'terms':[{'score':9.54045060534565,'term':'Orpington'},{'score':9.51091485452946,'term':'rioferdy'},{'score':7.2909283121013,'term':'Ferdinand'},{'score':6.31769766205264,'term':'shoppers'},{'score':5.58795911005166,'term':'Rio'},{'score':5.10715181727448,'term':'NewsShopperPat'},{'score':5.10715181727448,'term':'patrickgg'},{'score':5.10715181727448,'term':'Learmouth'},{'score':4.4079298177972,'term':'newsshopper'},{'score':4.4079298177972,'term':'newsquest'},{'score':4.34856203999334,'term':'Farnborough'},{'score':4.25188711225996,'term':'Lewisham'},{'score':4.18754147542609,'term':'stuns'},{'score':4.082180770457,'term':'QPR'},{'score':4.05570347173915,'term':'Bexley'},{'score':4.05570347173915,'term':'Gravesend'}]},
        {'count':16,'terms':[{'score':7.56042546895952,'term':'PLC'},{'score':4.85100995995305,'term':'Slovakia'},{'score':4.50039903586628,'term':'Republic'},{'score':4.39562842904269,'term':'retailers'},{'score':4.3570778248054,'term':'Hungary'},{'score':3.99472971209062,'term':'subsidiary'},{'score':3.98495246047307,'term':'Czech'},{'score':3.83613276823857,'term':'Malaysia'},{'score':3.82321433415768,'term':'Poland'},{'score':3.76305069401587,'term':'Thailand'},{'score':3.44681780767161,'term':'principal'},{'score':3.42677245859974,'term':'Price'},{'score':3.39088196874962,'term':'dispose'},{'score':3.38597161145017,'term':'Ireland'},{'score':3.35918147300109,'term':'Korea'},{'score':3.34651555905754,'term':'banking'}]},
        {'count':16,'terms':[{'score':49.6608149797635,'term':'Unilever'},{'score':38.7246666828755,'term':'Marmite'},{'score':33.6843342551169,'term':'customer'},{'score':28.6793087822098,'term':'Brexit'},{'score':27.8860983500349,'term':'dispute'},{'score':27.0672687527419,'term':'Jerry’s'},{'score':26.1159417471511,'term':'Supermarket'},{'score':23.9632721889295,'term':'Hellman’s'},{'score':23.9070272171753,'term':'Ben'},{'score':22.2258165561148,'term':'Metcalfe'},{'score':21.452572706065,'term':'LikeToDiscover'},{'score':21.277805362907,'term':'Sainsbury’s'},{'score':20.4557037790551,'term':'supplier'},{'score':20.4208276302832,'term':'Worm'},{'score':19.6007509518774,'term':'Wes'},{'score':19.46229354864,'term':'cucumber'}]}
    ];


    /**
     * Mix words up, mark which size bucket they should be in and return a fixed number of them.
     * @param terms
     */
    function processWords(terms){
        var words = terms.slice(0, 8);
        words.forEach(function(word, index){
            if(index === 0){
                word.bucket = 1;
            }else if(index < 4){
                word.bucket = 2;
            }else{
                word.bucket = 3;
            }
        });
        return words;
    }

    /**
     * Add bubble word
     */
    that.get = function(level){
        return processWords(personas[level-1].terms);
    };

    /**
     * Add bubble word
     */
    that.getGeneric = function(){
        return genericWords;
    };

    return that;
};