var generateWords = function(){
    var that = {};
    var words = [
        [{"score":79.6891050244722,"term":"Hillary"}, {"score":32.0767293657555,"term":"president"}, {"score":30.4316496541423,"term":"Chagoury"}],
        [{"score":16.5527306935874,"term":"Mittman"},{"score":16.4472653692226,"term":"PunditFact"},{"score":16.1416469637272,"term":"Exposed"}],
        [{"score":14.3278890654249,"term":"Foundation"},{"score":14.1183369218536,"term":"Bill"}, {"score":13.8761327631541,"term":"Committee"}],
        [{"score":13.1159781451632,"term":"Election"},{"score":12.9166434999403,"term":"Fox"}, {"score":12.8661195593877,"term":"Obama"}],
        [{"score":13.1159781451632,"term":"emails"},{"score":12.9166434999403,"term":"scandal"}, {"score":12.8661195593877,"term":"polls"}],
        [{"score":13.1159781451632,"term":"trump"},{"score":12.9166434999403,"term":"policy"}, {"score":12.8661195593877,"term":"FBI"}],
    ];

    var genericWords = [{"score":13.1159781451632,"term":"bla"},{"score":12.9166434999403,"term":"babble"}, {"score":12.8661195593877,"term":"jabber"}];

    /**
     * Add bubble word
     */
    that.get = function(level){
        return words[level-1];
    };

    /**
     * Add bubble word
     */
    that.getGeneric = function(){
        return genericWords;
    };

    return that;
};