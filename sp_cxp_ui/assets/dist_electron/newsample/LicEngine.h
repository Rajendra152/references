#ifndef LICENGINE_H
#define LICENGINE_H

#include <string>
#include "LicEngine_Export.h"

#ifdef __cplusplus
	extern "C" {
#endif
	LIC_ENGINE_API int StartLicenseEngine();
	LIC_ENGINE_API int StopLicenseEngine();
	LIC_ENGINE_API int InitLicenseManager(int nProductCode);
	LIC_ENGINE_API int LoadINIFileInfo(char* sPath, char* sStatusMsg);
	LIC_ENGINE_API int GetLicenseSearchMode(int* nMode); // nMode default value 0 - "AUTO";
	LIC_ENGINE_API int SetLicenseSearchMode(int nMode); // nMode = 0 - "AUTO"; 1 - "LOCAL"; 2 - "NETWORK"; 
	LIC_ENGINE_API int LoadLicenseInfoForSettings(char* sProductName, char* sVersion, char* sLicType, char* sExpiryDays, char* sLicManager, char* sLicStatusMsg);
	LIC_ENGINE_API int CheckLicense(bool* bValid, bool* bTrial, int* nTrialdays, char* sStatusMsg);
	//LIC_ENGINE_API int GetLicenseDetails(char* sLicInfo, char* sLicStatusMsg);
	LIC_ENGINE_API int GetLicenseDetails(char* sProductName, char* sVersion, char* sLicType, char* sExpiryDays, char* sLicManager, char* sLicStatusMsg);
	LIC_ENGINE_API int ActivateLicense(int nLicApplyType, char* sLicenseSrc, char* sAppliedStatus); // For nLicApplyType = 0 refers V2C File, nLicApplyType = 1 refers product key, nLicApplyType = 2 refers H2H File; sLicenseSrc refers V2C or H2H FilePath or Product Key based on nLicApplyType value. 
	LIC_ENGINE_API int GetLicenseManagerType(int* nLicManagerType, char* sStatus); // nLicManagerType = 0 - "SL-UserMode"; 1 - "SL-AdminMode";
	LIC_ENGINE_API int GetC2VDetails(char* sC2V, char* sStatus);
	LIC_ENGINE_API int GetLogInfo(char* sLogInfo, int* nLogInfoSize);
	LIC_ENGINE_API int GetUserMsgInfo(char* sInfo, char* sStatus);
	LIC_ENGINE_API int SetLogPathInfo(char* sPath, char* sStatusMsg);
	LIC_ENGINE_API int GetLogPathInfo(char* sPath, char* sStatusMsg);
	LIC_ENGINE_API int SetApplyLicLogPathInfo(char* sPath, char* sStatusMsg);
	LIC_ENGINE_API int GetApplyLicLogPathInfo(char* sPath, char* sStatusMsg);
	LIC_ENGINE_API int GetApplyLicLogInfo(char* sLogInfo, int* nLogInfoSize);

	// Network Manager API for Install / UnInstall
	LIC_ENGINE_API int CheckLicenseManager(char* sStatusMsg);
	LIC_ENGINE_API int LicenseManager(bool bInstall, char* sStatusMsg);
	// License Manager in different subnet
	LIC_ENGINE_API int SetLicenseManagerLoc(char* sIPInfo, char* sStatusMsg);
	LIC_ENGINE_API int GetINIstring(char* sINIInfo, char* sStatusMsg);
	LIC_ENGINE_API int SetINIstring(char* sINIInfo, char* sStatusMsg);
	//License Transfer API
	LIC_ENGINE_API int GetTargetMFP(char* sMFPFile, char* sStatusMsg);
	LIC_ENGINE_API int GetAvailableLicenses(char** sKeyIDList, char** sProductNameList, int* nRowSize, char* sStatusMsg);
	LIC_ENGINE_API int GetTransLicFile(char* sMFP, char* sLicFile, char* sStatusMsg); //Transfer license file
	LIC_ENGINE_API int CloseLicenseManager();
#ifdef __cplusplus
	}
#endif

#endif
