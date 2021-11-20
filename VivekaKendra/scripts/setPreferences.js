function loadPreferences()
{
	if(!(typeof g_InstOrgName === "undefined") && !(typeof IdInstOrgName === "undefined") && g_InstOrgName!="")
	{
		IdInstOrgName.innerHTML=g_InstOrgName;
	}
	if( !(typeof g_postLoadInit === "undefined") && g_postLoadInit!="")
	{
		g_postLoadInit();
	}
}
