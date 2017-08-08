const mockery = require(`mockery`);

let listController;

class ListModelMock {

  saveList(params) {
    let mockObj = {
      name: 'Test list',
      owner: 'Nestor',
      description: 'Lorem Ipsum dolor sit amet consectetur',
      pathImage: '',
      item: []
    };

    if (params.name !== 'Test list' && params.owner !== 'Nestor') {
      return(Promise.resolve(null));
    }
    
    return(Promise.resolve(mockObj));
  }

  addItemInList(listName, newItem) {
    let mockObj = {
      name : `list`,
      owner : `alejandro`,
      description : ``,
      pathImage : ``,
      item : [{
        name	:`item 1`,
        price	: 10,
        quantity: 5,
        reponsible: ``
      }
      ]};
    if (listName !== mockObj.name) {
      return(Promise.resolve(null));
    }
    else {
      mockObj.item.push(newItem);
    }
    return (Promise.resolve(mockObj)) ;
  }

}

let listModelMock;

let res = {
  status() {
    return this;
  },
  send() {}
};

describe(`list controller`, () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    mockery.registerMock(`./list.model.js`, ListModelMock);
    let ListController = require(`./list.controller`);
    listController = new ListController();
    listModelMock = new ListModelMock();
  });

  describe('Add New List to this user', () => {
    it('should retrieve new list added', (done) => {
      spyOn(res, 'status').and.callThrough();
      spyOn(res, 'send');

      listController.addList({body :{"name": 'Test list', "owner": 'Nestor', "description": 'Lorem Ipsum dolo sit amet consectetur', "pathImage": '', "item": []}}, res)
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({"data": {"name": 'Test list', "owner": 'Nestor', "description": 'Lorem Ipsum dolor sit amet consectetur', "pathImage": '', "item": []}});
          done();
        });
    });
  });

  describe(`Add Item in List`, () => {    
    it(`should retrieve the list that added the item`, (done) => {
      spyOn(res, `status`).and.callThrough();
      spyOn(res, `send`);
      
      listController.addItem({params:{listName: `list`}, body:{"item":{"name":`ads`,"price":23,"quantity":43}}},res).
        then(()=>{
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({"data":{"name": `list`, "owner" : `alejandro`, "description" : ``,
            "pathImage" : ``, "item": [{"name"	:`item 1`, "price"	: 10, "quantity": 5, "reponsible": ``}, {"name":`ads`, "price":23,"quantity": 43}]}});
          done();
        });
    });
  });

  describe(`Add Item in List`, () => {    
    it(`should retrieve the list that added the item`, (done) => {
      spyOn(res, `status`).and.callThrough();
      spyOn(res, `send`);
      listController.addItem({params:{listName: ``},body:{"item":{"name":`ads`,"price":23,"quantity":43}}},res).
        then(()=>{
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith({"error":`empty param`});
          done();
        });
    });
  });
	
  describe(`Add Item in List`, () => {    
    it(`should retrieve the list that added the item`, (done) => {
      spyOn(res, `status`).and.callThrough();
      spyOn(res, `send`);
      listController.addItem({params:{listName: `sdasd`},body:{"item":{"name":`ads`,"price":23,"quantity":43}}},res).
        then(()=>{
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({"data":null});
          done();
        });
    });
  });

	
});



