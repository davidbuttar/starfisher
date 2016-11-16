var generateWords = function(){
    var that = {};

    var genericWords = [{'score':13.1159781451632,'term':'bla'},{'score':12.9166434999403,'term':'babble'}, {'score':12.8661195593877,'term':'jabber'}];

    
    var personas = {
        'tesco':[
            {"count":16,"terms":[{"score":6.7570087716158,"term":"IOM"},{"score":5.45666700594984,"term":"coupon"},{"score":5.11453683258605,"term":"resale"},{"score":4.84798499333016,"term":"issuu"},{"score":4.26683726512005,"term":"checkout"},{"score":4.24238951658407,"term":"valid"},{"score":4.05588638811838,"term":"Clubcard"},{"score":3.91245945281923,"term":"Ltd"},{"score":3.85968978605095,"term":"redeemable"},{"score":3.67402427184786,"term":"shall"},{"score":3.56823737532119,"term":"transaction"},{"score":3.49793189764668,"term":"Hemp"},{"score":3.47495536393149,"term":"eCoupon"},{"score":3.29929297686951,"term":"magazine"},{"score":3.07667322608373,"term":"November"},{"score":2.90598247405902,"term":"Subject"}]},
            {"count":16,"terms":[{"score":16.6518000493672,"term":"Marmite"},{"score":16.5706339042767,"term":"Unilever"},{"score":10.1992831251673,"term":"Brexit"},{"score":7.62952912691912,"term":"supermarket"},{"score":7.30174089391176,"term":"dispute"},{"score":6.74757789252834,"term":"supplier"},{"score":5.34307121890362,"term":"Jerrys"},{"score":5.18888853073747,"term":"SOAR"},{"score":4.55094239406696,"term":"Ben"},{"score":4.51924669679352,"term":"row"},{"score":4.39117426834707,"term":"hwallop"},{"score":3.99067874966761,"term":"JOE"},{"score":3.9352089461604,"term":"sales"},{"score":3.79490454173904,"term":"fallout"},{"score":3.76955180099588,"term":"grocery"},{"score":3.73251472807323,"term":"uk"}]},
            {"count":16,"terms":[{"score":42.2082078623557,"term":"Customers"},{"score":29.7857469712385,"term":"PLC"},{"score":26.2753638502504,"term":"Bank"},{"score":26.1308600736363,"term":"Fraud"},{"score":25.8691634655463,"term":"Huffington"},{"score":22.4991300189301,"term":"nobodyanswering"},{"score":22.3000369907186,"term":"Scare"},{"score":21.4635910071236,"term":"stores"},{"score":19.3004576379647,"term":"Blocking"},{"score":19.1179417477367,"term":"Homeware"},{"score":18.446128263811,"term":"Thousands"},{"score":18.1453445192353,"term":"precautionary"},{"score":17.9432161230011,"term":"Clubcard"},{"score":17.9221157006186,"term":"Cards"},{"score":15.6595944106789,"term":"hacked"},{"score":15.595607142828,"term":"Groceries"}]}
        ],
        'rolex':[
            {"count":16,"terms":[{"score":41.8944476148408,"term":"dial"},{"score":40.4677128353028,"term":"GQ"},{"score":35.7867145070927,"term":"Breitling"},{"score":31.4295918078747,"term":"Americanlisted"},{"score":30.8625986529678,"term":"Zenith"},{"score":30.1278351969797,"term":"Omega"},{"score":30.0312676370929,"term":"Diamond"},{"score":27.7803845389042,"term":"Alpina"},{"score":26.9194080788207,"term":"Panerai"},{"score":25.5579100717764,"term":"British"},{"score":24.9431183211761,"term":"Cartier"},{"score":22.9522282045298,"term":"Pearlmaster"},{"score":21.9992278411657,"term":"Classifieds"},{"score":21.3520008058845,"term":"Guide"},{"score":21.3321651488227,"term":"chronograph"},{"score":20.6467413134992,"term":"Datejust"}]},
            {"count":16,"terms":[{"score":8.0362728129121,"term":"Hertfordshire"},{"score":5.23147059078366,"term":"Hatfield"},{"score":4.63195670681813,"term":"Metro"},{"score":4.59485836600902,"term":"Crimestoppers"},{"score":4.39154162959778,"term":"robbed"},{"score":4.36315779014706,"term":"distraught"},{"score":4.27199137582028,"term":"festival"},{"score":3.98768385341145,"term":"dayer"},{"score":3.9497054024344,"term":"Herts"},{"score":3.60338578530946,"term":"father's"},{"score":3.55442076053302,"term":"timepiece"},{"score":3.42505561558482,"term":"UKIP"},{"score":3.41072650524069,"term":"Boy"},{"score":3.32839602787467,"term":"gang"},{"score":3.26680808364583,"term":"dead"},{"score":3.23492820927601,"term":"meningitis"}]},
            {"count":16,"terms":[{"score":8.67732561718651,"term":"Tsonga"},{"score":8.12188884086629,"term":"Duress"},{"score":7.8628297953112,"term":"TennisTV"},{"score":6.80417267038894,"term":"Shanghai"},{"score":6.615819164843,"term":"Grigor"},{"score":6.37592157465372,"term":"Dimitrov"},{"score":6.04534759242358,"term":"Wilfried"},{"score":6.01788657445854,"term":"Kyrgios"},{"score":5.57290922539579,"term":"rjgjdpvbWj"},{"score":5.57290922539579,"term":"ballboys"},{"score":5.57290922539579,"term":"BmumqVcmrF"},{"score":5.52731145615985,"term":"Tennis"},{"score":5.27451597077118,"term":"SHRolexMasters"},{"score":5.27451597077118,"term":"Vasek"},{"score":5.10226816300548,"term":"Pospisil"},{"score":4.63964686405194,"term":"Zverev"}]}
        ],
        'nike':[
            {"count":16,"terms":[{"score":7.9516665040797,"term":"Adidas"},{"score":7.09910822710219,"term":"Armour"},{"score":6.77642183143377,"term":"FootballScoop"},{"score":5.94144501914224,"term":"FBS"},{"score":4.40666345782927,"term":"Russell"},{"score":4.09736819276208,"term":"Michigan"},{"score":3.6334907441246,"term":"Athletic"},{"score":3.57799974332801,"term":"Georgia"},{"score":3.52437712055647,"term":"Louisiana"},{"score":3.49372420837906,"term":"Florida"},{"score":3.33964814811566,"term":"Texas"},{"score":3.29425551721036,"term":"Tennessee"},{"score":3.26270855318276,"term":"CoachSamz"},{"score":3.09097589766824,"term":"Miami"},{"score":3.075653791761,"term":"Cincinnati"},{"score":3.06074571658365,"term":"Arizona"}]},
            {"count":16,"terms":[{"score":80.3615751388152,"term":"Sneaker"},{"score":48.3045704852634,"term":"Hyperadapt"},{"score":42.480857129739,"term":"Shoes"},{"score":33.0228922922483,"term":"Kobe"},{"score":27.9838227045454,"term":"colorway"},{"score":27.6515965862502,"term":"LeBron"},{"score":26.1453286098679,"term":"Lacing"},{"score":26.1443744309636,"term":"Collector"},{"score":25.7042041756799,"term":"Foamposite"},{"score":23.4701650150071,"term":"Flyknit"},{"score":23.4680140007599,"term":"Kicksologists"},{"score":23.0709935477223,"term":"Detroit"},{"score":22.3573124232687,"term":"Sole"},{"score":20.9375853317749,"term":"XX"},{"score":19.2964907753599,"term":"outsole"},{"score":19.201900257571,"term":"Zoom"}]},
            {"count":16,"terms":[{"score":10.2913711744853,"term":"NKE"},{"score":6.82733920827809,"term":"valorisation"},{"score":5.9022364989612,"term":"Traders"},{"score":5.62987072320004,"term":"Forcasts"},{"score":5.06149979696676,"term":"Inc"},{"score":4.86198897420877,"term":"forecasts"},{"score":4.7704946757874,"term":"Equities"},{"score":4.57102803699166,"term":"estimates"},{"score":4.30283988416511,"term":"analysts"},{"score":4.17490296401422,"term":"revenue"},{"score":4.16606643852356,"term":"Financials"},{"score":3.98069648538737,"term":"Nyse"},{"score":3.9787936990725,"term":"earnings"},{"score":3.87882466467951,"term":"dividend"},{"score":3.79529312404628,"term":"consensus"},{"score":3.60141149280835,"term":"EPS"}]}
        ]
    };

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

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
        return shuffleArray(words);
    }

    /**
     * Add bubble word
     */
    that.get = function(level, subject){
        return processWords(personas[subject][level-1].terms);
    };

    /**
     * Add bubble word
     */
    that.getGeneric = function(){
        return genericWords;
    };

    return that;
};