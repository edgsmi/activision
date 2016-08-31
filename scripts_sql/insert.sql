insert into ENVIRONMENT values ('LOCALHOST', 'localhost', '', 'https://localhost:8443/', 'Y');

insert into FEATURE values ('CUSTOMER', 'Customer feature');
insert into FEATURE values ('SUPPLY', 'Supply feature');
insert into FEATURE values ('CARRIER', 'Carrier feature');
insert into FEATURE values ('PAYMENT', 'Payment feature');

insert into PROPERTY_TYPE values ('GENERAL_PROPERTY_ATTRIBUTE', '');
insert into PROPERTY_TYPE values ('FRONT_CONFIGURATION', '');

insert into VERSION values ('16_7', 'version 16_7');
insert into VERSION values ('16_8', 'version 16_8');
insert into VERSION values ('16_9', 'version 16_9');
insert into VERSION values ('16_10', 'version 16_10');


insert into JIRA values ('CORE-15177', '', '16_7', 'CUSTOMER');
insert into JIRA values ('CORE-15148', '', '16_7', 'CUSTOMER');
insert into JIRA values ('CORE-14558', '', '16_7', 'CUSTOMER');
insert into JIRA values ('CORE-15270', '', '16_7', 'CUSTOMER');
insert into JIRA values ('CORE-15042', '', '16_7', 'CUSTOMER');
insert into JIRA values ('CORE-15424', '', '16_7', 'CUSTOMER');

insert into JIRA values ('CORE-15430', '', '16_8', 'CUSTOMER');
insert into JIRA values ('CORE-15040', '', '16_8', 'CUSTOMER');
insert into JIRA values ('CORE-14679', '', '16_8', 'CUSTOMER');
insert into JIRA values ('CORE-15565', '', '16_8', 'CUSTOMER');
insert into JIRA values ('CORE-15562', '', '16_8', 'CUSTOMER');
insert into JIRA values ('CORE-15560', '', '16_8', 'CUSTOMER');

insert into JIRA values ('CORE-15759', '', '16_9', 'CUSTOMER');
insert into JIRA values ('CORE-15685', '', '16_9', 'CUSTOMER');
insert into JIRA values ('CORE-15514', '', '16_9', 'CUSTOMER');
insert into JIRA values ('CORE-15680', '', '16_9', 'CUSTOMER');


insert into JIRA values ('CORE-15432', '', '16_10', 'CUSTOMER');
insert into JIRA values ('CORE-15389', '', '16_10', 'CUSTOMER');
insert into JIRA values ('CORE-15564', '', '16_10', 'CUSTOMER');
insert into JIRA values ('CORE-15804', '', '16_10', 'CUSTOMER');
insert into JIRA values ('CORE-15807', '', '16_10', 'CUSTOMER');
insert into JIRA values ('CORE-15806', '', '16_10', 'CUSTOMER');


insert into PROPERTY values ('cookie.privacy.name', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15177');
insert into PROPERTY values ('cookie.privacy.value.activation', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15270');
insert into PROPERTY values ('mydecathlon.geo.base.user', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15424');
insert into PROPERTY values ('customer.send.sms.check.phone.number', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15565');
insert into PROPERTY values ('customer.bo.search.type.default.selected', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15565');
insert into PROPERTY values ('check.same.country.geo.id.shipping.billing.address', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15759');
insert into PROPERTY values ('communication.ocms.bo.counters.main.page.enabled', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15759');
insert into PROPERTY values ('customer.mailparameter.datedelay.number.day', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15759');
insert into PROPERTY values ('customer.forget.password.popup.enabled', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15680');
insert into PROPERTY values ('ocms.mass_mailing.enabled', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15804');
insert into PROPERTY values ('communication.ocms.configuration.enabled.comment.part', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15806');
insert into PROPERTY values ('store.geo.location.log.enable', 'GENERAL_PROPERTY_ATTRIBUTE', 'CORE-15806');

