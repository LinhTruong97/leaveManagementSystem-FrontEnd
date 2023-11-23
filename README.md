## Description

A simple web application for managing leaves, which enables both admin, managers and their team members to efficiently request and oversee their time off. The purpose of this app is to assist individuals and teams in maintaining order and keeping their leave schedules in check.

## Link Deploy

App link: https://leave-management-system-hoailinhhhhh.netlify.app

## Sample account
Admin account:

* Email: admin1@test.com
* Password: admin1

Manager account:

* Email: manager1@test.com
* Password: manager1

Employee account:

* Email: employee1@test.com
* Password: employee1

## Quick information

- Each member has specific role
  - Role system: Employee < Manager - Admin Office
    -> limit access to certain features
- Each employee must have 1 manager to be reported to.
- Manager report to Admin office
- Member status: pending/active/terminated

- Specific features:

  - Create/Update/Terminate/Delete employee (Admin Office)
  - Approve/Reject leave request (Manager - Admin Office)
  - Create leave request (All)
  - Manage team and leave (Manager - Admin Office)

- Leave status: pending/approved/rejected

- Criteria to take leave:

  - Leave balance of category is availabe.
  - Leave cannot be applied for previous date.
  - Leave cannot be applied twice for same day.

## User Stories & Features

### Authentication

[x] All users can sign in with authorized accounts

[x] New employee can set up new account by using invitation from Admin Office

### Home Page

[x] Employee can only see quick information of their leave

[x] Manager/Admin Office can see 2 views (one view with their leave information, one view with their team/ company information)

### My Profile

[x] All users can view their profile

[x] All users can edit their information + upload avatar

### Employment Management

[x] Manager can see list of team's member

[x] Admin Office can see list of all employee

[x] Admin Office can add new employee

[x] Admin Office can send email invitation to employee to set up new account

[x] Admin Office can update, terminate, reactivate and delete employee

### My Leaves

[x] All users can check their leave balance

[x] All users can view all their leaves requests submitted

[x] All users can create leave requests with time, category, reason

[x] All users can delete/ update their leave requests (only when status is pending)

### Leave Management

[x] Manager/Admin Office can see the list of pending leave request

[x] Manager/Admin Office can view team's/employee's leave in calendar view

[x] Manager/Admin Office can approve/reject incharge person's leave request (in pending requests section and in calendar popup)

### Notification

[] Manager/Admin Office can receive in app notification when new request is submitted
[] Employee can receive in app notification when request is accepted/ rejected
