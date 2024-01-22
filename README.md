# Repair Order Tracker

## A CRA Application

Install the packages from the root directory
```bash
npm install
```
to run the server and client separately, open two terminals and run:

```bash
cd server && npm run dev
```
This will start the server instance.

In the second terminal run
```bash
cd client && npm run dev
```
this will start the client application.

If you would like to start them both at the same time, then from the root directory run:

```bash
npm run dev
```
This will start both the client and server in a single terminal.

## Environment

Environment variables are as follows
```shell
PORT=<port-to-listen-on>
MONGO_URI=<Your-mongodb-uri>
JWT_SECRET=<super-secret-hash>
```
These variables should get the server up
and running!

## The Problem

Flat-rate is an automotive industry standard for
the way most automotive technicians get paid. They
rely on a certain "book time" to get the hours to 
make a paycheck. An example would be if a vehicle 
came in, and a service manual says that it pays two
hours to complete a specific job. If the technician
spends only one hour to complete the job, they get
paid for the two hours. On the other hand, if they
complete it after four hours, they still only get
paid for two.

This is a pay system meant to incentivise the technician
to be quick with repairs. The quickness of the repair, in
turn, boosts a technician's productivity. In effect, they
can potentially give themselves a raise each week while
increasing profit for the componany.

Some shops still use old systems that aren't up to date
and technicians are left with being reliant on others to
keep track of their flagged hours and productivity. They
may also have no way of documenting, properly, certain
aspects of a repair that may be pertinent to them and 
disregarded by others.

## The Solution

The solution is to provide technicians with
yet another tool to be able to cover their
bases and to make sure that their hours are
accurate. Keeping track of how many hours
they flag... currently through a note system.
The idea is to be able to accurately document
the hours so that technicians can ensure that
they get paid what they earned.

## Usage

Currently the app is set up to accept form
input from the user. To create a Repair Order
the user needs to input a few pieces of information.

1. A repair order number
    - Most shops should have these printed for the technician.
    - The number is typically created when a customer is taken in.
2. A VIN (Vehicle Identification Number)
    - Usually located on the created repair order.
    - If not on the ticket, then it can be found on the vehicle.
    - This information is used to populate the vehicle make, model, year, and engine size.
    - The vehicle information is populated from the [NHTSA](https://vpic.nhtsa.dot.gov/api/) api.
3. A checkbox to indicate if a ticket is customer pay or warranty
    - Will be used as a later metric to make calculations on warranty book times compared to customer pay.
    - Customer pay can extend to include after market warranty companies.
    - There is a discrepancy in the book hours between warranty times and customer book times.
    - Future usage would be to include those discrepancies and make them transparent.
4. A notes section
    - This section is where most of the magic will happen currently.
    - Later this will be used strictly for notes. But for now, all input related to hours and repairs go here.

## Future Features

- [ ] Implement a lookup by VIN
    - allow other users to look up the VIN and view the notes and repairs from previous visits at other shops.
        - some information may need to be redacted if the requesting user didn't create the repair.
    - this feature is needed to confirm previous repairs when the repair is unknown to the customer.
    - helps to guide the technician to a possible repeat failure or causal failure from a previous repair.
- [ ] Data visualization
    - Let users visualize their hours on a daily, weekly, monthly, and annual basis.
        - set up aggregations to perform calculations for this feature.
    - Implement a sales amount per repiar order.
        - should have an aggregate for average sales per ticket.
        - should have total sales for day, week, month, and year.
            - helps to keep track of how much they  are making their employer.
- [ ] Image storage
    - should allow image storage for the user to attach images related to the repair.
        - to disk or not to disk... that is the question
- [ ] Setup email password recovery
    - currently no way to recover password.
    - should also implement an update user page for a similar purpose