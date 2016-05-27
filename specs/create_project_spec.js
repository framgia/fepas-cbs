describe('Create project', function() {
  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;
  });

  var randomVal = parseInt(Math.random() * 1000000000, 10);
  var name = 'name-' + randomVal;

  it('should add new project', function() {
    browser.get('http://localhost:5000/#/login');
    element(by.linkText('Sign in with Google')).click();
    browser.getAllWindowHandles().then(function (handles) {
      newWindowHandle = handles[1];
      browser.driver.switchTo().window(newWindowHandle).then(function () {
        browser.driver.findElement(by.id('Email')).sendKeys("framgia.fepas.test@gmail.com");
        browser.sleep(2000);
        browser.driver.findElement(by.id('next')).click();
        browser.sleep(2000)
        browser.driver.findElement(by.id('Passwd')).sendKeys("Fep@s2016");
        browser.sleep(2000);
        browser.driver.findElement(by.id('signIn')).click();
        browser.sleep(10000);
      });
      backWindowHandle = handles[0];
      browser.driver.switchTo().window(backWindowHandle)
    });
    browser.sleep(5000);
    browser.driver.get('http://localhost:5000/#/projects/new');

    element(by.model('newProject.project.projectName')).sendKeys(name);
    var select1 = element(by.model('newProject.project.projectOwners'));
    select1.$('[value="string:Vu Xuan Dung"]').click();
    var select2 = element(by.model('newProject.project.projectMembers'));
    select2.$('[value="string:Ngoc Trinh"]').click();

    element(by.model('newProject.project.dueDate')).sendKeys("05/31/2016");
    element(by.model('newProject.project.startDate')).sendKeys("05/25/2016");
    element(by.buttonText('Create')).click();
    browser.sleep(10000);

    browser.driver.get('http://localhost:5000/#/projects/' + name + '/show');
    browser.sleep(20000);

    var project_name = element(by.binding('project.info.projectName'));
    var project_members = element(by.binding('project.info.projectMembers'));
    var project_owners = element(by.binding('project.info.projectOwners'));

    expect(project_name.getText()).toEqual('Project Name: ' + name);
    expect(project_members.getText()).toEqual('Members: ["Ngoc Trinh"]');
    expect(project_owners.getText()).toEqual('Owners: ["Vu Xuan Dung"]');
    browser.sleep(10000);
  })

  it('should edit  project', function() {
    browser.get('http://localhost:5000/#/projects/'+ name + "/edit");
    browser.sleep(10000);
    var new_name = "name-" + parseInt(Math.random() * 1000000000, 10);
    element(by.model('project.info.projectName')).clear();
    element(by.model('project.info.projectName')).sendKeys(new_name);

    // element(by.model('project.info.projectOwners')).clear();
    var select1 = element(by.model('project.info.projectOwners'));
    select1.$('[value="string:Nguyen Xuan Son"]').click();

    // element(by.model('project.info.projectMembers')).clear();
    var select2 = element(by.model('project.info.projectMembers'));
    select2.$('[value="string:Le Trung Kien"]').click();

    element(by.buttonText('Save Changes')).click();
    browser.sleep(10000);

    browser.driver.get('http://localhost:5000/#/projects/' + name + '/show');
    browser.sleep(20000);

    var project_name = element(by.binding('project.info.projectName'));
    var project_members = element(by.binding('project.info.projectMembers'));
    var project_owners = element(by.binding('project.info.projectOwners'));

    expect(project_name.getText()).toEqual('Project Name: ' + new_name);
    expect(project_members.getText()).toEqual('Members: ["Le Trung Kien","Ngoc Trinh"]');
    expect(project_owners.getText()).toEqual('Owners: ["Vu Xuan Dung","Nguyen Xuan Son"]');
  })

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
})
