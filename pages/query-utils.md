# Manage indexes in Cloud Firestore

Cloud Firestore ensures query performance by requiring an index for every query. 

The indexes required for the most basic queries are automatically created for you. As you use and test your app, Cloud Firestore generates error messages that help you create additional indexes your app requires. 

### Create a missing index through an error message:

If you attempt a compound query with a range clause that doesn't map to an existing index, you receive an error. The error message includes a direct link to create the missing index in the Firebase console.

Follow the generated link to the Firebase console, review the automatically populated info, and click Create.

**_Note_:** 
    
    1.You can manage Cloud Firestore through the Firebase console or the Google Cloud Platform Console, but these links will always open in the Firebase console.

    2. For non-array and non-map fields, you must select ascending or descending ordering, even if you don't need the field for ordering. Your choice doesn't impact the behavior of equalities in the query.

### Use the Firebase console

#### To manually create a new index from the Firebase console:
<img src="https://github.com/ramtulluri/nestapp-server/blob/validations/pages/indexing-firestore.png"/>

* Go to the Cloud Firestore section of the Firebase console.

* Go to the Indexes tab and click Add Index.

* Enter the collection name and set the fields you want to order the index by.

* Click Create.

**_Note_:**
    Indexes can take a few minutes to build, depending on the size of the query. After you create them, you can see your indexes and their status in the Composite Indexes section. If they're still building, the Firebase console includes a building status bar.

### Remove indexes

#### To delete an index:

* Go to the Cloud Firestore section of the Firebase console.

* Click the Indexes tab.

* Hover over the index you want to delete and select Delete from the context menu.

* Confirm that you want to delete it by clicking Delete from the alert.

### Use the Firebase CLI
  You can also deploy indexes with the Firebase CLI. 
  
  * To get started, run firebase init firestore in your project directory. 
  * During setup, the Firebase CLI generates a JSON file with the default indexes in the correct format. 
  * Edit the file to add more indexes and deploy it with the firebase deploy command. 
  * If you only want to deploy indexes, add the --only firestore:indexes flag.

  ```bash 
    {
      // Required, specify compound indexes
      indexes: [
        {
          collectionGroup: "posts",
          queryScope: "COLLECTION",
          fields: [
            { fieldPath: "nama", order: "DESCENDING" },
            { fieldPath: "address", order: "DESCENDING" }
          ]
        }
      ],

      fieldOverrides: [
        {}
      ]
    }
```


# Batch save limitations:

* **Maximum batch size:** The total size of a batch, including all write operations and overhead, must be less than 10 MiB.

* **Maximum number of operations in a batch:** The maximum number of write operations allowed in a single batch is 500.

* **Maximum document size:** The size of each document being written in a batch must be less than 1 MiB.

* any individual write operation fails in a batch, the entire batch will be rolled back means that either all the writes in a batch will succeed, or none of them will.