function removeEditorAndViewer() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var activeSheet = ss.getActiveSheet();
  
  var sourceID = activeSheet.getRange(3,2).getValue();

  var memberToRemove = activeSheet.getRange(4,2).getValue();

  folderAndFiles(sourceID, ss, memberToRemove);
  
}


function folderAndFiles(folderID, ss, memberToRemove) {
  
  var folder = DriveApp.getFolderById(folderID);
  
  var files = folder.getFiles();
  
  while(files.hasNext()) {
    
    try { 
      var file = files.next();
      
      var fileName = file.getName();
      Logger.log('File name: ' + fileName);
      
      ss.toast(fileName, 'Current file is:');
      
      var listEditors = file.getEditors();
      var editors = [];
         for (var cnt = 0; cnt < listEditors.length; cnt++) {
             editors.push(listEditors[cnt].getEmail());
             Logger.log(editors);
         };
      var listViewers = file.getViewers();
      var viewers = [];
         for (var cnt = 0; cnt < listViewers.length; cnt++) {
             viewers.push(listViewers[cnt].getEmail());
             Logger.log(viewers);
         }
         cnt++;
      
      if (editors == memberToRemove) {
        file.removeEditor(memberToRemove);
        
        ss.toast(fileName, 'Removed member as an editor from file:');
      }
      else if (viewers == memberToRemove) {
        file.removeViewer(memberToRemove);

        ss.toast(fileName, 'Removed member a viewer from file:');
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
      Logger.log('Child Folder name: ' + childName);
  
      var childId = child.getId();
      
      var listEditors = child.getEditors();
      var editors = [];
         for (var cnt = 0; cnt < listEditors.length; cnt++) {
             editors.push(listEditors[cnt].getEmail());
             Logger.log(editors);
         };
      var listViewers = child.getViewers();
      var viewers = [];
         for (var cnt = 0; cnt < listViewers.length; cnt++) {
             viewers.push(listViewers[cnt].getEmail());
             Logger.log(viewers);
         }
         cnt++;
      
      if (editors == memberToRemove) {
        child.removeEditor(memberToRemove);
        
        ss.toast(fileName, 'Removed member as an editor from folder:');
      }
      else if (viewers == memberToRemove) {
        child.removeViewer(memberToRemove);

        ss.toast(fileName, 'Removed member as a viewer from folder:');
      }
      
      folderAndFiles(childId, ss, memberToRemove);
    }
    catch(e) {
      Logger.log('Problem with folder: ' + e); 
    }
    
  }
  
}