$(function() {
    
    var client = ZAFClient.init();
    
    function azurecall() {
        var token ="token";
        var org = "org";
        var base64Pat = btoa(":"+token);
        var request = new XMLHttpRequest;
        request.open("GET","https://dev.azure.com/"+ org + "/_apis/projects?api-version=2.0", true);
        var b = "Basic " + base64Pat;
        request.setRequestHeader("Authorization", b);
        
        request.onload = function() {
            var data = JSON.parse(JSON.stringify(this.response));
            console.log(data);
            return data;
        }
        request.send();
    }
    
    function renderText(text) {
        var mainSectionEl = document.querySelector('section[data-main]');
        mainSectionEl.innerText = text;
    }
    
    function getCurrentUser() {
        return client.get('currentUser').then(function(data) {
            return data['currentUser'];
        });
    }
    
    function init() {
        getCurrentUser().then(function(currentUser) {
            renderText('Hi ' + currentUser.name + ', trying to link to Azure? \n How will we get this working with JS :( ');
        });
        azurecall();
    }
    
    client.on('app.registered', function() {
        client.invoke('resize', { width: '100%', height: '80px' });
        init();
    });
    
});