# Test Emails for n8n Automation

Send these test emails to: **support.productyaar@gmail.com**

Each email will be processed by n8n within 1 minute and appear in the dashboard automatically.

---

## 1. SALES - Ready to Purchase (High Priority)

**To:** support.productyaar@gmail.com

**Subject:** Ready to enroll but payment failing

**Body:**
```
Hi,

I want to enroll in the Product Management course right away. I was about to complete the payment,
but the payment page keeps giving me an error. The deadline for this cohort closes today.

Can you help me process the payment urgently?

Thanks,
Rahul Kapoor
```

**Expected:**
- Department: Sales
- Priority: High
- Issue Type: Payment Inquiry
- Status: Open

---

## 2. FINANCE - Payment Deducted but No Access (High Priority)

**To:** support.productyaar@gmail.com

**Subject:** Payment processed but course not accessible

**Body:**
```
Hello,

I made a payment of ₹15,000 for the Advanced PM course on March 28th. The amount was deducted from my account,
but when I tried to access the course, it still shows as locked.

I have the transaction receipt. Please grant me access immediately.

Regards,
Priya Menon
```

**Expected:**
- Department: Finance
- Priority: High
- Issue Type: Payment Processing Error
- Status: Open

---

## 3. TECH SUPPORT - Platform Outage (Critical)

**To:** support.productyaar@gmail.com

**Subject:** Website down - can't access anything

**Body:**
```
URGENT!

The entire platform has been down for the past 2 hours.
I'm getting a 503 Service Unavailable error on every page.

Multiple students have reported the same issue. This is affecting all regions.

Please investigate immediately.

Thanks,
Vikram Singh
```

**Expected:**
- Department: Tech Support
- Priority: Critical
- Issue Type: System Outage
- Status: Open

---

## 4. TECH SUPPORT - Video Loading Issue (Medium Priority)

**To:** support.productyaar@gmail.com

**Subject:** Videos buffering constantly

**Body:**
```
Hi,

I'm trying to watch Module 3 lectures, but the videos are constantly buffering and taking 5+ minutes to load.
This happens on both Chrome and Firefox. My internet speed is good (50 Mbps).

Can you check if there's a video delivery issue?

Thanks,
Amit Deshmukh
```

**Expected:**
- Department: Tech Support
- Priority: Medium
- Issue Type: Performance Issue
- Status: Open

---

## 5. ACADEMIC SUPPORT - Course Access Denied (High Priority)

**To:** support.productyaar@gmail.com

**Subject:** Can't access course after enrollment

**Body:**
```
Dear Support,

I successfully enrolled and paid for "Advanced Product Strategy" course yesterday.
However, when I log in, the course still shows as "Locked" in my dashboard.

I have the enrollment confirmation. Can you please unlock it for me?

Best regards,
Neha Mathur
```

**Expected:**
- Department: Academic Support
- Priority: High
- Issue Type: Course Access Issue
- Status: Open

---

## 6. ACADEMIC SUPPORT - Assignment Upload Error (Medium)

**To:** support.productyaar@gmail.com

**Subject:** Can't submit assignment - upload error

**Body:**
```
Hi,

I'm trying to submit Module 5 assignment but getting an error when I try to upload the file.
The error message is: "File upload failed. Please try again."

I've tried different browsers and file formats, but nothing works.

Can you help?

Thanks,
Rajesh Pillai
```

**Expected:**
- Department: Academic Support
- Priority: Medium
- Issue Type: Assignment Submission Error
- Status: Open

---

## 7. ACADEMIC SUPPORT - Certificate Delay (Low Priority)

**To:** support.productyaar@gmail.com

**Subject:** Certificate not received after completion

**Body:**
```
Hello,

I completed the "Product Fundamentals" course 3 weeks ago and passed all assessments.
However, I haven't received my certificate yet.

Can you please check on this?

Thanks,
Aisha Nair
```

**Expected:**
- Department: Academic Support
- Priority: Low (but Medium due to escalation - 3 weeks is long)
- Issue Type: Certificate Delay
- Status: Open

---

## 8. FINANCE - Invoice Request (Medium Priority)

**To:** support.productyaar@gmail.com

**Subject:** GST invoice needed for tax filing

**Body:**
```
Hi,

I need an official invoice with GST details for the course I purchased last month.
It's for my company's expense reimbursement and tax filing.

Can you send me the invoice with GST breakdown?

Thanks,
Suresh Reddy
```

**Expected:**
- Department: Finance
- Priority: Medium
- Issue Type: Invoice Request
- Status: Open

---

## 9. SALES - Pricing Inquiry (Medium Priority)

**To:** support.productyaar@gmail.com

**Subject:** Bulk license pricing for corporate training

**Body:**
```
Hello,

We're looking to train our team of 50+ employees on product management.
Can you provide bulk licensing pricing and package details?

We're looking for an enterprise solution.

Best,
Chirag Mehta
Corporate Training Manager
```

**Expected:**
- Department: Sales
- Priority: Medium
- Issue Type: Corporate Bulk Inquiry
- Status: Open

---

## 10. GENERAL SUPPORT - Mixed Issues (Medium)

**To:** support.productyaar@gmail.com

**Subject:** Multiple problems with the platform

**Body:**
```
Hi,

I'm having multiple issues:
1. Payment shows as pending but course isn't accessible
2. Videos won't load
3. Can't update my profile

Not sure which department to contact. Can you help?

Thanks,
Somya
```

**Expected:**
- Department: General Support
- Priority: Medium
- Issue Type: Multi-Department Issue
- Status: Open

---

## 11. GENERAL SUPPORT - Feature Request (Low Priority)

**To:** support.productyaar@gmail.com

**Subject:** Dark mode feature request

**Body:**
```
Hi,

I love the platform! The content is amazing.

One suggestion: Could you add a dark mode for the dashboard?
It would be easier on the eyes for evening study sessions.

Thanks for the great product!
```

**Expected:**
- Department: General Support
- Priority: Low
- Issue Type: Feedback
- Status: Open

---

## 12. TECH SUPPORT - Login Failure (High Priority)

**To:** support.productyaar@gmail.com

**Subject:** Can't login to account

**Body:**
```
Hello Support,

I'm unable to log into my account. Password reset isn't working either.
I've tried 5 times but keep getting "Invalid credentials" error.

I need to access my course materials urgently for tomorrow's assignment.

Help!
```

**Expected:**
- Department: Tech Support
- Priority: High
- Issue Type: Authentication Failure
- Status: Open

---

## 📊 Staff Available for Assignment

When you view tickets and try to assign them, you'll see these **9 team members** in the dropdown:

**Admin:**
- Rajesh Kumar (admin@edtech.com) - Can see all tickets

**Sales Team:**
- Priya Sharma (priya@edtech.com)
- Aman Patel (aman@edtech.com)

**Finance Team:**
- Vikram Joshi (vikram@edtech.com)
- Neha Verma (neha@edtech.com)

**Tech Support Team:**
- Arjun Singh (arjun@edtech.com)
- Anjali Desai (anjali@edtech.com)

**Academic Support:**
- Rohan Nair (rohan@edtech.com)

**General Support:**
- Sneha Gupta (sneha@edtech.com)

---

## 🚀 How to Test

1. **Send any of the above emails** to support.productyaar@gmail.com
2. **Wait 1 minute** for n8n to process
3. **Refresh dashboard** (http://localhost:5173)
4. **New ticket appears** with auto-assigned department, priority, issue type
5. **Click on ticket** to view details
6. **Assign to an agent** from the dropdown (9 names with Indian origin)
7. **Add notes** and update status

---

## ✅ Full Test Workflow

```
Send Email
    ↓ (1 min)
n8n processes (Gemini AI classifies)
    ↓
Creates ticket in Supabase
    ↓
Dashboard shows in real-time
    ↓
Admin/Agent views ticket
    ↓
Assigns to team member from dropdown
    ↓
Updates status → In Progress → Resolved → Closed
```

---

Good luck testing! 🎉
