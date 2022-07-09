var list = ["banana", "apple"]

/** Function: Add items by parsing body and check conflict of duplicate */
add = (body) => {        
    var item = JSON.parse(body)
    if(list.indexOf(item) !== -1){
        return  {'code': 409, 'body': 'Failed, item already existed'}
    } else {
    list.push(item)
    return {'code': 201, 'body': `Success, item added: ${JSON.parse(body)}`};
    }
}

/** Function: Remove item by parsing body if which is in the list */
removeOne = (body) =>{
    var item = JSON.parse(body)
    var index = list.indexOf(item);
    if (index !== -1) { 
      list.splice(index, 1); 
      return {'code': 200, 'body': `Success, item removed: ${JSON.parse(body)}`};
    } else {
        return {'code': 204, 'body': 'Failed, item is not existed'};
    }
    
}

/** Function: Remove all items in the list */
removeAll = () => {
    list = [];
    return {'code': 200, 'body': 'Success, remove all items in the list'}
}

//Endpoint with GET method: list all items
exports.get = (route) => {
    switch(route){
        case "list":
            return {'code': 200, 'body': list};
        default:
            return {'code': 400, 'body': 'Bad Request'};
    }
}

//Endpoint with POST method: 1. add item 2. remove all items
exports.post = (route, body) => {
    switch(route){
        case "add":             
            return add(body);
            break;
        case "removeAll":
            return removeAll();
        default:
            return {'code': 400, 'body': 'Bad Request'};
    }
}

//Endpoint with PUT method: remove item
exports.put = (route, body) => {
    switch(route){
        case "removeOne":
            return removeOne(body);         
        default:
            return {'code': 400, 'body': 'Bad Request'};
    }
}
