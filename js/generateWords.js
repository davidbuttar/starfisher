var generateWords = function(){
    var that = {};
    var words = [{"score":79.6891050244722,"term":"Hillary"},{"score":32.0767293657555,"term":"president"},{"score":30.4316496541423,"term":"Chagoury"},{"score":23.2719289086426,"term":"Eko"},{"score":16.5527306935874,"term":"Mittman"},{"score":16.4472653692226,"term":"PunditFact"},{"score":16.1416469637272,"term":"Exposed"},{"score":15.4063070241396,"term":"Provigil"},{"score":14.3278890654249,"term":"Foundation"},{"score":14.1183369218536,"term":"Bill"},{"score":13.8761327631541,"term":"Committee"},{"score":13.5823600100973,"term":"Fraud"},{"score":13.1159781451632,"term":"Election"},{"score":12.9166434999403,"term":"Fox"},{"score":12.8661195593877,"term":"Obamaâ€™s"},{"score":12.8179171334358,"term":"artwork"}];
    words = words.slice(0, 3);
    /**
     * Add bubble word
     */
    that.get = function(){
        return words;
    };

    return that;
};