package com.heritagetimes

import android.app.Application
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.squareup.sdk.mobilepayments.MobilePaymentsSdk

class MainApplication : Application(), ReactApplication {

  companion object {
    private const val TAG = "MainApplication"
  }

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()

    val squareApplicationId = BuildConfig.SQUARE_APPLICATION_ID.trim()
    if (squareApplicationId.isEmpty()) {
      Log.e(TAG, "Square SDK not initialized: SQUARE_APPLICATION_ID is empty.")
    } else {
      try {
        MobilePaymentsSdk.initialize(squareApplicationId, this)
        Log.i(TAG, "Square SDK initialized successfully.")
      } catch (error: Throwable) {
        Log.e(TAG, "Square SDK initialization failed.", error)
      }
    }

    loadReactNative(this)
  }
}
