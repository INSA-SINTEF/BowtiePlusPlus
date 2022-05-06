# User manual

This manual describes how to use the BowTie++ application.

- [User manual](#user-manual)
  - [Create diagrams](#create-diagrams)
  - [Save diagrams](#save-diagrams)
    - [Save locally](#save-locally)
    - [Save online (in database)](#save-online-in-database)
  - [Open diagrams](#open-diagrams)
    - [Open local diagrams](#open-local-diagrams)
    - [Open online diagrams](#open-online-diagrams)
  - [Analysis report generation](#analysis-report-generation)
  - [Risk computation](#risk-computation)
  - [Helper to fill-in the likelihood and impact matrices](#helper-to-fill-in-the-likelihood-and-impact-matrices)
  - [Comments on the diagram's components](#comments-on-the-diagrams-components)
  - [Versioning](#versioning)
  - [Accessing the statistics](#accessing-the-statistics)
  - [Account management](#account-management)
    - [Create an account](#create-an-account)
    - [Account settings](#account-settings)
    - [Enable two-factor authentication](#enable-two-factor-authentication)
  - [Share diagrams](#share-diagrams)
    - [Access diagrams shared by other users](#access-diagrams-shared-by-other-users)
    - [Managing users](#managing-users)
  - [User tutorial](#user-tutorial)

## Create diagrams
The Bowtie++ application starting page looks as follows: 

![](images/interface.png)

- The **<span style="color: #3f48cc">blue</span>** area contains the elements one can add to a Bowtie diagram.
- The **<span style="color: #ec1c24">red</span>** area is where one can edit the elements of a Bowtie diagram.
- The **<span style="color: #0ed145">green</span>** area allows one to edit the font and text style of a selected element in the diagram. To select an element, click on it. If nothing is selected, the user can edit the display settings of the diagram (Grid, Page views, etc.) by checking the corresponding box.  
- The **<span style="color: #ffca18">yellow</span>** bar on top allows for:
  - Changing the zoom. 
  - Undoing or redo actions. 
  - Deleting a selected element.
  - Moving the selected element to foreground or background. 
  - Editing the style of the links of a selected element.
   

To add an element to a Bowtie diagram, one can either click on the element in the **<span style="color: #3f48cc">blue</span>** area or drag and drop the element from the **<span style="color: #3f48cc">blue</span>** area to the diagram in the **<span style="color: #ec1c24">red</span>** area.

To link elements on the diagram, left-click on the border of the first element and **hold** down the mouse button to the border of the second element: 

<img src="Images/threat.png" width="300">

## Save diagrams
After modifying a diagram, it can be saved.
### Save locally
To save a diagram locally, use the 'Export' button and choose one of the following formats : XML, PNG, SVG or JPEG.

<img src="Images/barre.png" width="200">


### Save online (in database)

The diagrams created with BowTie++ can also be saved in a database. To do so, the user needs to be logged in and then can click on 'Save' button, as shown bellow:

<img src="Images/FsTo7fU.png" width="200">

The saving interface will then open: 

<img src="Images/gT9dRYL.png" width="200">

The following parameters can be provided :

- The name of the diagram (by default it's the name of the unwanted event).
- The tags the diagram can be referenced with. Tags correspond to keywords and must be seperated ",".
- Diagrams marked as public are visible and can be copied by any user.

A saved diagram can be modified and saved again, without a necessity of re-inputing the parameters again. 

If necessary, the parameters can be modified (for instance, new name can be chosen) by pressing the "save as" button: 

<img src="Images/4VCg62t.png" width="200">


## Open diagrams
Diagrams saved on a computer or in the database can be opened again.

### Open local diagrams
Locally saved diagram can be opened in two ways.

Click on the 'Import' button like shown bellow:

<img src="Images/RXFkvEU.png" width="300">

Then choose the file containing the diagram.

Use the 'Open' menu (shown bellow) then choose 'Open local file...' and choose the file containing the diagram.

<img src="Images/wvcrlzk.png" width="300">

### Open online diagrams
To open the diagram from the database, click on the 'Open' button, then choose 'Open from database...' or 'Open template...' (like shown bellow) :

<img src="Images/R9MBtbT.png" width="300">

When clicked, it will load a new interface with all the diagrams stored in the database and that are accessible dor the current user. This includes: the user's diagrams, the public ones, and the diagrams shared with this user by other users.

<img src="Images/oG5XfVW.png" width="300">


By default, this interface will show the user all the diagrams he owns(private diagrams), or that someone shared with him (shared). The user can also select all the public diagrams by selecting 'Public' in the 'Sharing mode' bellow:

<img src="Images/aoRLIgH.png" width="200">

The user can select which diagram he wants to be displayed by typing its name or its description (node values, like 'Unwanted Event' or 'Hazard' for the diagram with id:2). He can also use tags to select which group of diagrams he wants to display.

By pressing the red bin graphic, the user can delete a diagram from the database, only if he is the owner, or if it was shared with him (in that case he will only delete his link to the diagram since he's not the diagram's owner).

## Analysis report generation
A report (in the pdf format) presenting the results of the analysis performed can be generated by BowTie++. To do so, click on the
'Generate report' button in the File menu. 

## Risk computation

To quickly edit the parameters of a threat, the user can directly click on the likelihood matrix linked to the threat.

<img src="Images/risk.png" width="300">


To open the risk computation window and check or edit threats', consequences' and barriers' parameters, click on the "Risk computation" button, the following window will show up: 

<img src="Images/YihfDgu.png" width="500">


The first table allows the user to see and edit the threats' and consequences' parameters. To switch between threats or consequences, click on the corresponding button in the top-left or top-right corner.

**Threats table**

Threat's parameters can be edited by clicking on the "Edit parameters" Button, which will display the following line: 

<img src="Images/guxASNt.png" width="700">


The barriers' failure probability can be edited by clicking on the "Edit Barriers' failure probability" button, which will display a small menu showing barriers linked to the threat and their failure probability.

<img src="Images/8NTOmLB.png" width="700">


**Consequences table**

Clicking on the "Consequences" button in the top-right corner will display the consequences parameters in the first table.

<img src="Images/5s6c3no.png" width="700">

Consequences' parameters can be directly edited. The barriers' failure probability can be edited just like the threats' one, by clicking on the "Edit barriers' failure probability" button.
The consequence's line with the highest risk value is highlighted in red.

**Results table**

This table allows to see different results. To check which formulas are used to compute these results, click on the "Formulas Details" button: 

<img src="Images/zabSOpm.png" width="700">

This window will show up: 

<img src="Images/jjntaWL.png" width="700">

The user can navigate through formulas by clicking on the different tabs. The last tab "Color indicators" shows the table used to convert values to colors and vice versa.

## Helper to fill-in the likelihood and impact matrices 

Filling-in likelihood and impact matrices can be challenging without proper support. So to properly fill-in these matrices, it is strongly recommended to check the helper box. As it is possible to see in the following image, after selecting the 'help' button, a new interface will be loaded for the matrix chosen. The helper contains definitions for each parameter of the matrix and an area where the user can enter the scale related to his matrix. This will allow any user to understand the level of danger related to each parameter of his likelihood or impact matrices.

<img src="Images/helper.png" width="700">

<img src="Images/helper_impact.png" width="700">


## Comments on the diagram's components 

It is now possible to add comments on every single element of the diagram. This feature is particularly useful if the user wants to add more information (a description, a URL link or else ) to his diagram. A little circle will then appear on the top of the element (on which the user added his comment) to visually signal the presence of his comment. In the image below, the circle appears inside the yellow circle and the comment associated is inside the red rectangle on the right.

<img src="Images/comment1.png" width="700">


## Versioning

🔴 WARNING: Currently this feature is occasionning a nasty bug with VueJS that may result in the user's browser crashing (because of an infinite recursion in the reactive declaration of a new Object through VueJS). Hence, it is strongly recommanded to avoid using Versioning.

It is advised to go back to a previous version of the diagram the user was working on (created at each save). To do so, in the same way as for online diagrams, use the 'Open' menu and choose 'Open previous version...', as shown bellow:

<img src="Images/lGS0iNk.png" width="400">

The user will have access to a new interface with all the existing versions of his diagram, with the number corresponding to the version and its date of creation. The user can select the one desired by pressing the 'Revert to this diagram' button. The version he was working on so far will remain in the list of versions but all the modifications made to the diagram which were not saved will disapear.

## Accessing the statistics
Statistics are provided to users who have the **Researcher** status. This status can only be given by an administrator. For users with a researcher status, a link will be added to their navigation bar. This link leads to the following page :

<img src="Images/pD5Cyif.png" width="500">

 
Statistics' data can be downloaded in a csv file at the bottom of the page: 
<img src="Images/VeVpHo5.png" width="500">

## Account management

Bowtie++ offers an authentication service so users can save their work and share it with others. 

### Create an account

**First**, take notice of the **User account management and requirements** section in the `wiki.md` file.

To create an account, use the "Sign in" button at the top right of the home page, and then use the "sign up" link to access the registration page. 
Enter a username, an email and a password. Username and password follow the policy:
- **Username** : can only be composed of letters, digits, underscores, dashes and space. It can not begin by a white space.
- **Password** : at least 9 characters and a mix of letters (uppercase AND lowercase), digits and special characters (must contain at least one character of each type mentioned previously).


The email address provided must exist since it will be used by several key functionnalities in Bowtie++. After clicking on the "sign up" button, an email will be sent to the provided e-mail address. The user must then click on the link to confirm that it's his. If the confirmation is successful, a message like the one below will appear after clicking on the link:

<img src="Images/4SzfoeB.png" width="300">

When the account has been successfully created, the user can go back to the login page and enter their credentials. Once logged in, they should see that the navigation bar has changed and looks as follows:

<img src="Images/W8w3ajD.png" width="200">

### Account settings

To access the account settings, click on "My account". This page is composed of three menus:
- The profile information.
- The "Security" menu where users can change their password and enable the two-factor authentication.
- The "Danger zone" menu where users can delete their account. Be careful, this deletion is definitive -- all data is erased from the database.

### Enable two-factor authentication

On the account settings page, go to the "Security" tab and click on "Enable 2FA" as illustrated below :

<img src="Images/SlbNior.png" width="700">

A QR code needed to be scanned with the appropriate application (Google Authenticator or FreeOTP form Redhat, for example) will appear, like showed on the following picture.

<img src="Images/OdL1D9D.png" width="300">

Type the code provided by the authentication app and submit it in the corresponding field below the QR code. Two-factor authentication is now enabled. Every time the user will try to sign in to Bowtie++, he will be asked to provide a 6-digits code. This code is the one given by the authentication app. The two-factor authentication can be disabled at any time.

<span style="color: #dc3545">**WARNING**</span>: if the token stored in the 2FA application is lost or deleted (for instance in Google Authenticator), logging in Bowtie++ will **NOT** be possible unless an administrator disables the two-factor authentication on the users account. 

## Share diagrams

To share a diagram, first save it in the database, then just click on the 'Share with' button shown bellow:

<img src="Images/QxV4tdV.png" width="300">

Enter the email of the user which the diagram will be shared with, and choose its role:
- **reader**, meaning the user will only be able to see the diagram.
- **writer**, the user will be able to modify the diagram.

<img src="Images/ZgAVk1F.png" width="300">

Moreover, there is a checkbox allowing to share the risk computation. This box is checked by default. More details about the risk computation [here](#-Risk-Computation).

### Access diagrams shared by other users

Once a diagram is shared, the user can find it by clicking on the 'File'>'Open'>'Open from database' button. Then, he can select the 'Sharing mode' : 'Shared with me'. There, he can easily access diagrams that people shared with him.

<img src="Images/EGrkOhL.png" width="200">

### Managing users

Once a diagram is shared with other users, the roles can be managed and access to the diagram can be removed from a certain user. 
Bowtie++ offers this functionnality through the 'Manage diagram sharing' button shown bellow:

<img src="Images/HjpFMTE.png" width="300">


It will then open the management interface shown bellow:

<img src="Images/MA5ePaB.png" width="300">


Through this management interface, the user can:
- **Share with a new user**, by typing their email, choosing their role and selecting whether he shares the risk computation or not. 
- **Remove user access**, by clicking the black cross next to a user email.
- **Modify the user's role**, by dragging and dropping their email in the relevant column.

## User tutorial 
This feature guides the user throughout the whole creation of his diagram. All he has to do is follow the steps as depicted in the image below. After the completion of the current step, the tutorial updates itself to show the following step. This is particularly helpful if it's the user's first time using the BowTie++ software.
These are the steps one can follow to create his diagram according to the top-down approach :

  - Step 1 : Choose the unwanted situation to analyse. Only one is allowed.
  - Step 2 : Choose the main hazard related to the studied unwanted event  (i.e., something around or part of the organization which has the potential to cause damage). Only one is allowed.
  - Step 3 : Choose the assets of the diagram, ie. the resources to protect. It is usual to have several assets, think about what is valuable !
  - Step 4 : Fill the left side of the diagram with all the events that can lead to the unwanted situation. Usually, a complete diagram should have on average 8 threats and/or causes. Be exhaustive and keep the most important elements.
  - Step 5 : Ratio between barriers and causes/threats. Add barriers to make threats/causes relevant and improve diagram quality (Ratio of 1 is good).
  - Step 6 : Ratio between esc. factors and barriers. Add escalation factors to model precisely a barrier failure probability (Ratio of 0.5 is good).
  - Step 7 : Fill the right side of the diagram with all the consequences resulting by the unwanted event. Usually, a complete diagram should have 4 consequences at least. Be exhaustive and keep the most important ones !
  - Step 8 : Ratio between barriers and causes/threats. Add barriers to make threats/causes relevant and improve diagram quality (Ratio of 1 is good).
  - Step 9 : Ratio between esc. factors and barriers. Add escalation factors to model precisely a barrier failure probability (Ratio of 0.5 is good)

<img src="Images/tutorial.png" width="200">

<img src="Images/tutorial2.PNG" width="200">

