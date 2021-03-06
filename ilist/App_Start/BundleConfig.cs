﻿using System.Web;
using System.Web.Optimization;

namespace ilist
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/foundation").Include(
                "~/Scripts/jquery.js",
                "~/Scripts/what-input.js",
                "~/Scripts/foundation.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/node_modules/angular/angular.js",
                        "~/node_modules/angular-ui-router/release/angular-ui-router.js"));

            bundles.Add(new ScriptBundle("~/bundles/controllers").Include("~/Scripts/controllers/*Controller.js"));

            bundles.Add(new ScriptBundle("~/bundles/services").Include("~/Scripts/services/*Service.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/foundation.css", "~/Content/site.css"));
        }
    }
}
