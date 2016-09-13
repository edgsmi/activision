insert into COUNTRY values ('FR');
insert into COUNTRY values ('DE');
insert into COUNTRY values ('ES');
insert into COUNTRY values ('UK');
insert into COUNTRY values ('IT');

insert into PLATFORM values ('LOCALHOST');
insert into PLATFORM values ('INTE');
insert into PLATFORM values ('EC');
insert into PLATFORM values ('PR');


//insert into ENVIRONMENT values (1, 'localhost', '', 'FR', 'https://localhost:8443/restservices/services/getGeneralPropertyValues', 'Y');
//insert into ENVIRONMENT values ('FR', 'LOCALHOST', '', 'http://localhost:8686/', 'getGeneralPropertyValuesLocalFr');
//insert into ENVIRONMENT values ('FR', 'INTE', '', 'http://localhost:8686/', 'getGeneralPropertyValuesLocalFr');
//insert into ENVIRONMENT values ('DE', 'LOCALHOST', '', 'http://localhost:8686/', 'getGeneralPropertyValuesLocalDe');
//insert into ENVIRONMENT values ('DE', 'INTE', '', 'http://localhost:8686/', 'getGeneralPropertyValuesLocalDe');
//insert into ENVIRONMENT values ('ES', 'LOCALHOST', '', 'http://localhost:8686/', 'getGeneralPropertyValuesLocalEs');


insert into ENVIRONMENT values ('FR', 'LOCALHOST', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('DE', 'LOCALHOST', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('ES', 'LOCALHOST', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('UK', 'LOCALHOST', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('IT', 'LOCALHOST', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('FR', 'INTE', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('DE', 'INTE', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('ES', 'INTE', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('UK', 'INTE', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('IT', 'INTE', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('FR', 'EC', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('DE', 'EC', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('ES', 'EC', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('UK', 'EC', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('IT', 'EC', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('FR', 'PR', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('DE', 'PR', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('ES', 'PR', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('UK', 'PR', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');
insert into ENVIRONMENT values ('IT', 'PR', '', 'https://localhost:8443/', 'restservices/services/getGeneralPropertyValues');



insert into ENVIRONMENT values ('ES', 'INTE', '', 'http://localhost:8686/', 'getGeneralPropertyValuesLocalEs');


insert into ENVIRONMENT values (1, 'localhost', '', 'DE', 'http://localhost:8686/', 'getGeneralPropertyValuesLocalDe', 'Y');
insert into ENVIRONMENT values (1, 'localhost', '', 'ES', 'http://localhost:8686/', 'getGeneralPropertyValuesLocalEs', 'Y');

insert into FEATURE values (1, 'CUSTOMER', 'Customer feature');
insert into FEATURE values (2, 'SUPPLY', 'Supply feature');
insert into FEATURE values (3, 'CARRIER', 'Carrier feature');
insert into FEATURE values (4, 'PAYMENT', 'Payment feature');

insert into PROPERTY_TYPE values (1, 'GENERAL_PROPERTY_ATTRIBUTE', 'GPA', '');
insert into PROPERTY_TYPE values (2, 'FRONT_CONFIGURATION', 'FC', '');

insert into VERSION values (1, '16_7', 'version 16_7');
insert into VERSION values (2, '16_8', 'version 16_8');
insert into VERSION values (3, '16_9', 'version 16_9');
insert into VERSION values (4, '16_10', 'version 16_10');


insert into JIRA values (1, 'CORE-15177', '', 1, 1);
insert into JIRA values (2, 'CORE-15148', '', 1, 1);
insert into JIRA values (3, 'CORE-14558', '', 1, 1);
insert into JIRA values (4, 'CORE-15270', '', 1, 1);
insert into JIRA values (5, 'CORE-15042', '', 1, 1);
insert into JIRA values (6, 'CORE-15424', '', 1, 1);

insert into JIRA values (7, 'CORE-15430', '', 2, 1);
insert into JIRA values (8, 'CORE-15040', '', 2, 1);
insert into JIRA values (9, 'CORE-14679', '', 2, 1);
insert into JIRA values (10, 'CORE-15565', '', 2, 1);
insert into JIRA values (11, 'CORE-15562', '', 2, 1);
insert into JIRA values (12, 'CORE-15560', '', 2, 1);

insert into JIRA values (13, 'CORE-15759', '', 3, 1);
insert into JIRA values (14, 'CORE-15685', '', 3, 1);
insert into JIRA values (15, 'CORE-15514', '', 3, 1);
insert into JIRA values (16, 'CORE-15680', '', 3, 1);


insert into JIRA values (17, 'CORE-15432', '', 4, 1);
insert into JIRA values (18, 'CORE-15389', '', 4, 1);
insert into JIRA values (19, 'CORE-15564', '', 4, 1);
insert into JIRA values (20, 'CORE-15804', '', 4, 1);
insert into JIRA values (21, 'CORE-15807', '', 4, 1);
insert into JIRA values (22, 'CORE-15806', '', 4, 1);


insert into PROP values ('cookie.privacy.name', 1, 1, '');
insert into PROP values ('cookie.privacy.value.activation', 1, 4, '');
insert into PROP values ('mydecathlon.geo.base.user', 1, 6, '');
insert into PROP values ('customer.send.sms.check.phone.number', 1, 10, '');
insert into PROP values ('customer.bo.search.type.default.selected', 1, 10, '');
insert into PROP values ('check.same.country.geo.id.shipping.billing.address', 1, 13, '');
insert into PROP values ('communication.ocms.bo.counters.main.page.enabled', 1, 13, '');
insert into PROP values ('customer.mailparameter.datedelay.number.day', 1, 13, '');
insert into PROP values ('customer.forget.password.popup.enabled', 1, 16, '');
insert into PROP values ('ocms.mass_mailing.enabled', 1, 20, '');
insert into PROP values ('communication.ocms.configuration.enabled.comment.part', 1, 22, '');
insert into PROP values ('store.geo.location.log.enable', 1, 22, '');



insert into PROP values ('mydecathlon.base.api.url', 1, 6, 'https://mydkt-preprod.oxylane.com/mydkt-server-mvc/ajax/public/api/');
insert into PROP values ('mydecathlon.base.url.use.http', 1, 6, 'Y');
insert into PROP values ('mydecathlon.bo.codeappli', 1, 6, 'OsmoseBo');
insert into PROP values ('mydecathlon.bo.deletedcustomers.enable', 1, 6, '');
insert into PROP values ('mydecathlon.bo.editadjustements.enable', 1, 6, null);
insert into PROP values ('mydecathlon.bo.editcustomer.enable', 1, 6, 'Y');
insert into PROP values ('mydecathlon.bo.enable', 1, 6, '');
