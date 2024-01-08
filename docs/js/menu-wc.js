'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">farmflow-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link" >AccountModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AccountModule-b214df7973e04d3ee0228f4997ea92a66ee7410abe049d7288a32ec96105881541e75c6f83872691f77b7f3dc0f7d4b323d09b7379f5134c00e0a9b3d660bbfc"' : 'data-bs-target="#xs-injectables-links-module-AccountModule-b214df7973e04d3ee0228f4997ea92a66ee7410abe049d7288a32ec96105881541e75c6f83872691f77b7f3dc0f7d4b323d09b7379f5134c00e0a9b3d660bbfc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountModule-b214df7973e04d3ee0228f4997ea92a66ee7410abe049d7288a32ec96105881541e75c6f83872691f77b7f3dc0f7d4b323d09b7379f5134c00e0a9b3d660bbfc"' :
                                        'id="xs-injectables-links-module-AccountModule-b214df7973e04d3ee0228f4997ea92a66ee7410abe049d7288a32ec96105881541e75c6f83872691f77b7f3dc0f7d4b323d09b7379f5134c00e0a9b3d660bbfc"' }>
                                        <li class="link">
                                            <a href="injectables/AccountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-9df021bf7c32d85aabd9e421895c75636349ef0c6f74776ba620bf407f8917e2cb2e3173b400a4417b00468e6d60ff24d1134a621f5dc80e1cfad85a484762f4"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-9df021bf7c32d85aabd9e421895c75636349ef0c6f74776ba620bf407f8917e2cb2e3173b400a4417b00468e6d60ff24d1134a621f5dc80e1cfad85a484762f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-9df021bf7c32d85aabd9e421895c75636349ef0c6f74776ba620bf407f8917e2cb2e3173b400a4417b00468e6d60ff24d1134a621f5dc80e1cfad85a484762f4"' :
                                        'id="xs-injectables-links-module-AuthModule-9df021bf7c32d85aabd9e421895c75636349ef0c6f74776ba620bf407f8917e2cb2e3173b400a4417b00468e6d60ff24d1134a621f5dc80e1cfad85a484762f4"' }>
                                        <li class="link">
                                            <a href="injectables/AuthSerializer.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthSerializer</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BaseModule.html" data-type="entity-link" >BaseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BaseModule-18c1e0ce5c8d4259e0aa128098b1cb92d3530efac66013254a8b33d1cd8e038a176f64523c708e1563753eae1604a5ad3035dd77c83d6d4a81f5989149fc6f73"' : 'data-bs-target="#xs-controllers-links-module-BaseModule-18c1e0ce5c8d4259e0aa128098b1cb92d3530efac66013254a8b33d1cd8e038a176f64523c708e1563753eae1604a5ad3035dd77c83d6d4a81f5989149fc6f73"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BaseModule-18c1e0ce5c8d4259e0aa128098b1cb92d3530efac66013254a8b33d1cd8e038a176f64523c708e1563753eae1604a5ad3035dd77c83d6d4a81f5989149fc6f73"' :
                                            'id="xs-controllers-links-module-BaseModule-18c1e0ce5c8d4259e0aa128098b1cb92d3530efac66013254a8b33d1cd8e038a176f64523c708e1563753eae1604a5ad3035dd77c83d6d4a81f5989149fc6f73"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonModule.html" data-type="entity-link" >CommonModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FirestoreModule.html" data-type="entity-link" >FirestoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RestModule.html" data-type="entity-link" >RestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RestModule-447e8c706dd38af8d33fe29d444734ec0dd59f499ebce446d3985b42dfbbe5cc62c1ea6820d6b8a8de09e7e63adf26ed14c3188100fa977b7c8c1c34910d671f"' : 'data-bs-target="#xs-controllers-links-module-RestModule-447e8c706dd38af8d33fe29d444734ec0dd59f499ebce446d3985b42dfbbe5cc62c1ea6820d6b8a8de09e7e63adf26ed14c3188100fa977b7c8c1c34910d671f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RestModule-447e8c706dd38af8d33fe29d444734ec0dd59f499ebce446d3985b42dfbbe5cc62c1ea6820d6b8a8de09e7e63adf26ed14c3188100fa977b7c8c1c34910d671f"' :
                                            'id="xs-controllers-links-module-RestModule-447e8c706dd38af8d33fe29d444734ec0dd59f499ebce446d3985b42dfbbe5cc62c1ea6820d6b8a8de09e7e63adf26ed14c3188100fa977b7c8c1c34910d671f"' }>
                                            <li class="link">
                                                <a href="controllers/FarmController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FarmController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/WorkerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RestModule-447e8c706dd38af8d33fe29d444734ec0dd59f499ebce446d3985b42dfbbe5cc62c1ea6820d6b8a8de09e7e63adf26ed14c3188100fa977b7c8c1c34910d671f"' : 'data-bs-target="#xs-injectables-links-module-RestModule-447e8c706dd38af8d33fe29d444734ec0dd59f499ebce446d3985b42dfbbe5cc62c1ea6820d6b8a8de09e7e63adf26ed14c3188100fa977b7c8c1c34910d671f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RestModule-447e8c706dd38af8d33fe29d444734ec0dd59f499ebce446d3985b42dfbbe5cc62c1ea6820d6b8a8de09e7e63adf26ed14c3188100fa977b7c8c1c34910d671f"' :
                                        'id="xs-injectables-links-module-RestModule-447e8c706dd38af8d33fe29d444734ec0dd59f499ebce446d3985b42dfbbe5cc62c1ea6820d6b8a8de09e7e63adf26ed14c3188100fa977b7c8c1c34910d671f"' }>
                                        <li class="link">
                                            <a href="injectables/FarmRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FarmRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FarmService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FarmService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/WorkerRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkerRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/WorkerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FarmController.html" data-type="entity-link" >FarmController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/WorkerController.html" data-type="entity-link" >WorkerController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiResponseBuilder.html" data-type="entity-link" >ApiResponseBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/BankInfo.html" data-type="entity-link" >BankInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/BankInfoDto.html" data-type="entity-link" >BankInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseModel.html" data-type="entity-link" >BaseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOwnerDto.html" data-type="entity-link" >CreateOwnerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionsFilter.html" data-type="entity-link" >ExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Farm.html" data-type="entity-link" >Farm</a>
                            </li>
                            <li class="link">
                                <a href="classes/FarmDto.html" data-type="entity-link" >FarmDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FarmMapperProfile.html" data-type="entity-link" >FarmMapperProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirebaseAuthStrategy.html" data-type="entity-link" >FirebaseAuthStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/LinkFarmOwnerDto.html" data-type="entity-link" >LinkFarmOwnerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LinkFarmWorkerDto.html" data-type="entity-link" >LinkFarmWorkerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Owner.html" data-type="entity-link" >Owner</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatedResponseData.html" data-type="entity-link" >PaginatedResponseData</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationBuilder.html" data-type="entity-link" >PaginationBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payload.html" data-type="entity-link" >Payload</a>
                            </li>
                            <li class="link">
                                <a href="classes/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="classes/SalaryHistory.html" data-type="entity-link" >SalaryHistory</a>
                            </li>
                            <li class="link">
                                <a href="classes/SalaryHistoryDto.html" data-type="entity-link" >SalaryHistoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnlinkFarmOwnerDto.html" data-type="entity-link" >UnlinkFarmOwnerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnlinkFarmWorkerDto.html" data-type="entity-link" >UnlinkFarmWorkerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Worker.html" data-type="entity-link" >Worker</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkerBenefits.html" data-type="entity-link" >WorkerBenefits</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkerBenefitsDto.html" data-type="entity-link" >WorkerBenefitsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkerDto.html" data-type="entity-link" >WorkerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkerMapperProfile.html" data-type="entity-link" >WorkerMapperProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkerSalary.html" data-type="entity-link" >WorkerSalary</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkerSalaryDeduction.html" data-type="entity-link" >WorkerSalaryDeduction</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkerSalaryDeductionsDto.html" data-type="entity-link" >WorkerSalaryDeductionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkerSalaryDto.html" data-type="entity-link" >WorkerSalaryDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthSerializer.html" data-type="entity-link" >AuthSerializer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigService.html" data-type="entity-link" >ConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FarmRepository.html" data-type="entity-link" >FarmRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FarmService.html" data-type="entity-link" >FarmService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GqlAuthGuard.html" data-type="entity-link" >GqlAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerContextMiddleware.html" data-type="entity-link" >LoggerContextMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OwnerRepository.html" data-type="entity-link" >OwnerRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilService.html" data-type="entity-link" >UtilService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkerRepository.html" data-type="entity-link" >WorkerRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkerService.html" data-type="entity-link" >WorkerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthenticatedGuard.html" data-type="entity-link" >AuthenticatedGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Account-1.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filtering.html" data-type="entity-link" >Filtering</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FirestoreModuleOptions.html" data-type="entity-link" >FirestoreModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payload.html" data-type="entity-link" >Payload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Sorting.html" data-type="entity-link" >Sorting</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});