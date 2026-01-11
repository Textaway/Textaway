import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import useAppLevelAuth from "@/hooks/useAppLevelAuth";
import { Crown, Check, AlertTriangle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Premium() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn } = useAppLevelAuth();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
 const [paymentData, setPaymentData] = useState({
// ... existing code ...
    fetchUser();
  }, [isLoggedIn, router]);

  const handleCancelSubscription = async () => {
    if (!cancelReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please tell us why you want to cancel.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await SendEmail({
        to: "Adrian.brooks@huttoisd.org",
        subject: "Premium Subscription Cancellation Request",
        body: `User ${currentUser.firstName} ${currentUser.lastName} (${currentUser.email}) has requested to cancel their Premium subscription.
Reason:
${cancelReason}

Please remove premium status from this account.`
      });

      toast({
        title: "Cancellation Request Sent",
        description: "Your request has been submitted. You will lose access at the end of your billing cycle.",
      });
      setShowCancelDialog(false);
      setCancelReason("");
    } catch (error) {
      console.error("Failed to send cancellation:", error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive"
      });
} finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
// ... existing code ...
  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
if (currentUser.isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 mb-6">
              <Crown className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">You are a Premium Member</h1>
            <p className="text-gray-400 text-lg mb-8">
              Thank you for your support! You have access to all exclusive features.
            </p>
            
            <Card className="bg-[#1a1a1a] border-gray-800 text-left mb-8">
              <CardHeader>
                <CardTitle className="text-white">Your Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
<div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400">Plan</span>
                  <span className="text-white font-semibold">Skywatch Premium</span>
                </div>
<div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-500 font-semibold">Active</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Price</span>
                  <span className="text-white font-semibold">$9.99/month</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              variant="destructive" 
              onClick={() => setShowCancelDialog(true)}
              className="w-full md:w-auto"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
<Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="h-5 w-5" />
                Cancel Subscription
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                We're sorry to see you go. Please let us know why you're cancelling so we can improve.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="I'm cancelling because..."
                className="bg-[#2a2a2a] border-gray-700 text-white min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setShowCancelDialog(false)} className="text-gray-400 hover:text-white">
                Keep Subscription
</Button>
              <Button 
                variant="destructive" 
                onClick={handleCancelSubscription}
                disabled={loading || !cancelReason.trim()}
              >
                {loading ? "Submitting..." : "Confirm Cancellation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
{/* Header */}
// ... existing code ...
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
                    >
                      {loading ? "Processing..." : (
                        <>
                          Subscribe Now <span className="text-white/80 text-sm font-normal">($9.99/mo)</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to our Terms of Service and Privacy Policy.
                    <br />
                    Recurring billing of $9.99/month. Cancel anytime.
                  </p>
                </form>
