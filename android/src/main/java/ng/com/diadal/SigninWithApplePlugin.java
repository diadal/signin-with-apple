package ng.com.diadal;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SigninWithApple")
public class SigninWithApplePlugin extends Plugin {

    private SigninWithApple implementation = new SigninWithApple();

    @PluginMethod
    public void authorize(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.authorize(value));
        call.resolve(ret);
    }
}
