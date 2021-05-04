// urlParams is null when used for embedding
window.urlParams = window.urlParams || {};
window.STATIC_SERVER_DOMAIN = window.STATIC_SERVER_DOMAIN || 'http://localhost:8080'

// Public global variables
window.MAX_REQUEST_SIZE = window.MAX_REQUEST_SIZE  || 10485760;
window.MAX_AREA = window.MAX_AREA || 15000 * 15000;

// URLs for save and export
window.EXPORT_URL = window.EXPORT_URL || '/export';
window.LOCAL_SAVE_URL = window.LOCAL_SAVE_URL || '/save';
window.OPEN_URL = window.OPEN_URL || '/open';

// Sets the base path, the UI language via URL param and configures the
// supported languages to avoid 404s. The loading of all core language
// resources is disabled as all required resources are in grapheditor.
// properties. Note that in this example the loading of two resource
// files (the special bundle and the default bundle) is disabled to
// save a GET request. This requires that all resources be present in
// each properties file since only one file is loaded.
window.mxBasePath = window.mxBasePath || '../lib/mxgraph/src'; // Relative to the editor.html page
window.mxLanguage = window.mxLanguage || urlParams['lang'];
window.mxLanguages = window.mxLanguages || ['de'];

// Pages
window.ROOT_PAGE = window.ROOT_PAGE || '/'
window.EDITOR_PAGE = window.EDITOR_PAGE || window.ROOT_PAGE + 'html/editor.html'
window.LOGIN_PAGE = window.LOGIN_PAGE || window.ROOT_PAGE + 'login';
window.REGISTER_PAGE = window.REGISTER_PAGE || window.ROOT_PAGE + 'register';
window.RESET_PASSWORD_PAGE = window.RESET_PASSWORD_PAGE || window.ROOT_PAGE + 'password-reset';
window.ACCOUNT_PAGE = window.ACCOUNT_PAGE || window.ROOT_PAGE + 'settings';
window.STATISTICS_PAGE = window.STATISTICS_PAGE || window.ROOT_PAGE + 'statistics';

// Dialogs
window.OPEN_DIALOG = window.OPEN_DIALOG || window.ROOT_PAGE + 'html/open.html';
window.RISK_DIALOG = window.RISK_DIALOG || window.ROOT_PAGE + 'html/risk-computation.html';
window.DIAGRAM_SEARCH_DIALOG = window.DIAGRAM_SEARCH_DIALOG || window.ROOT_PAGE + 'html/diagram-search.html';
window.ROLE_MANAGER_DIALOG = window.ROLE_MANAGER_DIALOG || window.ROOT_PAGE + 'html/role-manager.html';


// Resources
// Path is relative to the editor.html page
window.RESOURCES_PATH = window.RESOURCES_PATH || '../resources';
window.STENCIL_PATH = window.STENCIL_PATH || '../stencils';
window.IMAGE_PATH = window.IMAGE_PATH || '../images';
window.STYLE_PATH = window.STYLE_PATH || '../styles';
window.CSS_PATH = window.CSS_PATH || '../styles';
window.RESOURCE_BASE = window.RESOURCE_BASE || window.RESOURCES_PATH + '/grapheditor';

// API RELATED
window.API_DOMAIN = window.API_DOMAIN || 'http://localhost:8000';

// Authentication
window.API_LOGIN = window.API_LOGIN || window.API_DOMAIN + '/api/user/token';
window.API_USER_DATA = window.API_USER_DATA || window.API_DOMAIN + '/api/user/me';
window.API_REGISTER = window.API_REGISTER || window.API_DOMAIN + '/api/user/create';
window.API_RESET_PASSWORD = window.API_RESET_PASSWORD || window.API_DOMAIN + '/api/user/password/reset';
window.API_DELETE_ACCOUNT = window.API_DELETE_ACCOUNT || window.API_DOMAIN + '/api/user/delete';
window.API_CONFIRM_EMAIL = window.API_CONFIRM_EMAIL || window.API_DOMAIN + '/api/user/confirm';
window.API_CREATE_2FA_CODE = window.API_CREATE_2FA_CODE || window.API_DOMAIN + '/api/user/totp/create';
window.API_VERIFY_2FA_CODE = window.API_VERIFY_2FA_CODE || window.API_DOMAIN + '/api/user/totp/verify';
window.API_LOGIN_2FA = window.API_LOGIN_2FA || window.API_DOMAIN + '/api/user/totp/login';
window.API_DISABLE_2FA = window.API_DISABLE_2FA || window.API_DOMAIN + '/api/user/totp/disable';
window.API_UPDATE_PASSWORD = window.API_UPDATE_PASSWORD || window.API_DOMAIN + '/api/user/password/update';

// Statistics
window.API_STATISTICS = window.API_STATISTICS || window.API_DOMAIN + '/api/diagram/stats';

// Diagrams
window.API_SAVE_DIAGRAM = window.API_SAVE_DIAGRAM || window.API_DOMAIN + '/api/diagram/private';
window.API_UPDATE_DIAGRAM = window.API_UPDATE_DIAGRAM || window.API_DOMAIN + '/api/diagram/'; // {id}
window.API_PUBLIC_DIAGRAMS = window.API_PUBLIC_DIAGRAMS || window.API_DOMAIN + '/api/diagram/public/list';
window.API_PRIVATE_DIAGRAMS = window.API_PRIVATE_DIAGRAMS || window.API_DOMAIN + '/api/diagram/private/list';
window.API_SHARE_DIAGRAM = window.API_SHARE_DIAGRAM || window.API_DOMAIN + '/api/diagram/share/'; // + {graphid}
window.API_DIAGRAMS_SHARED_WITH_ME = window.API_DIAGRAMS_SHARED_WITH_ME || window.API_DOMAIN + '/api/diagram/share/'; // {id} Although the id isn't useful
