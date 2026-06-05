
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.iRHCMwIP.js","/cdn/shopifycloud/checkout-web/assets/c1/app.BPHa1I27.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor.ku7Bai70.js","/cdn/shopifycloud/checkout-web/assets/c1/browser.DMtZF8AU.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-is-shop-pay-active.Df2QKpfR.js","/cdn/shopifycloud/checkout-web/assets/c1/Theme-utilities.vuMRp4vl.js","/cdn/shopifycloud/checkout-web/assets/c1/images-payment-icon.C_9SDN8i.js","/cdn/shopifycloud/checkout-web/assets/c1/purchasing-company-isValidPurchasingCompanyBillingAddress.CDja3zLO.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-object.BOLpIJoE.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-unactionable-errors.CMvTQgTC.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayCheckoutGqlVersion.Bz5yv8NB.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-ShopPayCheckoutSessionQuery.BxpesEhg.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-setAddressErrors.CpcXbiIM.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal.Dgy52KO7.js","/cdn/shopifycloud/checkout-web/assets/c1/images-flag-icon.C_eXYJRt.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.IO46J2Lb.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.C-R3ihj0.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsTimeout.CTk2J0Of.js","/cdn/shopifycloud/checkout-web/assets/c1/remember-me-hooks.D8Sjiu_p.js","/cdn/shopifycloud/checkout-web/assets/c1/OffsitePaymentFailed.B8Mpb3LT.js","/cdn/shopifycloud/checkout-web/assets/c1/NoAddressLocationFullDetour.AC0T26FO.js","/cdn/shopifycloud/checkout-web/assets/c1/SplitDeliveryMerchandiseContainer.CT8BBoXs.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.B2khdm9X.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink.wO2fLglV.js","/cdn/shopifycloud/checkout-web/assets/c1/WalletsSandbox-WalletSandbox.DPz83X6H.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl.BBMBdCPX.js","/cdn/shopifycloud/checkout-web/assets/c1/GooglePayButton-index.DRcA2tjq.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer.CY_pOwhE.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingGroupsSummaryLine.CJd5ERVt.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview.BhyFB0AT.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks.49hPMXO_.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField.Tr_anhix.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayPaymentRequiredMethod.BJBo5sBp.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress.B1_hCXQO.js","/cdn/shopifycloud/checkout-web/assets/c1/WalletLogo.C2YeLWp0.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage.CKi1yzL1.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShowShopPayOptin.DW-0t0L0.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShowCreateMoreAccountsGdprTreatment.jjz7QUoe.js","/cdn/shopifycloud/checkout-web/assets/c1/Section.Da7yD1zO.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary.Ds5G6u1M.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit.CpdTvJyW.js","/cdn/shopifycloud/checkout-web/assets/c1/PayPalOverCaptureInfoBanner.F8zz0xgL.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-get-negotiation-input.DaRjBMit.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-constants.-M2IyNds.js","/cdn/shopifycloud/checkout-web/assets/c1/redemption-constants.Cu2A-vp8.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner.tj631wV8.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList.DZFgJX_f.js","/cdn/shopifycloud/checkout-web/assets/c1/DutyOptions.6Rvxb1Y1.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.BcJQARtA.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.DpAXfmZH.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-shipping-options.Bk2VWAOn.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector.B4U2KTtX.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown.PlvaCw9S.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSubscribeMessenger.CU76N52L.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.BCzDAbSF.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/is-shop-pay-active.C-ppsiYq.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/utilities.F5mjvpnu.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useUnauthenticatedErrorModal.Vi1HzX9e.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.BTKlz-bT.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/SplitDeliveryMerchandiseContainer.CRDql5Io.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalizationExtensionField.UsZTbb_4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.CqVkJv9Z.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useOnePageFormSubmit.BRUjVIS4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/WalletLogo.CIy8uDiZ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ChangeCompanyLocationLink.uqpm88mq.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Section.CU18S7Ap.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DutyOptions.LcqrKXE1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PayPalOverCaptureInfoBanner.CuS5ve3d.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/NoAddressLocationFullDetour.CpFaJIpx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/WalletSandbox.CnR7qNLY.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShippingMethodSelector.B0hio2RO.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/SubscriptionPriceBreakdown.BSemv9tH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StackedMerchandisePreview.D6OuIVjc.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  