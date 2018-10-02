
global.contract ={
    Suggestion: "0x89904738D575bc9C1eEd8b26E996b6E3b276b948"
}

global.helpers ={
    timeConverter: function (t) {     
        var a = new Date(t * 1000);
        var today = new Date();
        var yesterday = new Date(Date.now() - 86400000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        if (a.setHours(0,0,0,0) == today.setHours(0,0,0,0))
            return 'today, ' + hour + ':' + min;
        else if (a.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0))
            return 'yesterday, ' + hour + ':' + min;
        else if (year == today.getFullYear())
            return date + ' ' + month + ', ' + hour + ':' + min;
        else
            return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
    }
}