﻿using System.Web;
using System.Web.Mvc;

namespace React_Table_Accordion
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
