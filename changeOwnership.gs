function changeOwnership() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = ss.getActiveSheet();
  
  var sourceID = activeSheet.getRange(3,2).getValue();
  
  var currentOwner = activeSheet.getRange(4,2).getValue();
  
  var newOwner = activeSheet.getRange(5,2).getValue();
  
  folderAndFiles(sourceID, ss, currentOwner, newOwner);
  
}

function folderAndFiles(folderID, ss, currentOwner, newOwner) {
  
  var folder = DriveApp.getFolderById(folderID);
  
  var files = folder.getFiles();
  
  while(files.hasNext()) {
    
    try { 
      var file = files.next();
      
      var fileName = file.getName();
      Logger.log('File name: ' + fileName);
      
      ss.toast(fileName, 'Current file is:');
      
      var currentFileOwner = file.getOwner().getEmail();
      
      if (currentFileOwner == currentOwner) {
        file.setOwner(newOwner);
        
        ss.toast(fileName, 'Changed File:');
      }
    }
    catch(e) {
      Logger.log('Problem with file: ' + e);
    }
    
  }
  
  var childFolders = folder.getFolders();
  
  while(childFolders.hasNext()) {
    
    try {
      var child = childFolders.next();
      
      var childName = child.getName();
      Logger.log('Folder name: ' + childName);
      
      var childId = child.getId();
      
      var currentChildOwner = child.getOwner().getEmail();
      
      if (currentChildOwner == currentOwner) {
        child.setOwner(newOwner);
        
        ss.toast(childName, 'Changed Folder:');
      }
      
      folderAndFiles(childId, ss, currentOwner, newOwner);
    }
    catch(e) {
      Logger.log('Problem with folder: ' + e); 
    }
    
  }
  
}