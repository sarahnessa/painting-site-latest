# Authentication Plan

## Current state

The site currently has no account or authentication flow. Bids are held in React state in `App.tsx`, so they are lost when the page reloads and are not associated with a verified bidder. The bid panel offers a contact action, but it does not submit or persist a bid.

## Goal

If bidder accounts are introduced, let a bidder identify themselves before submitting a binding bid and provide a reliable way to contact them after an auction closes. Keep browsing paintings and series available without signing in.

## Proposed flow

1. A visitor can browse the site without an account.
2. When the visitor proceeds to submit a bid, ask them to sign in or create an account.
3. Verify the bidder's email address before accepting a bid.
4. After authentication, show the bid amount and painting details for confirmation.
5. Submit the confirmed bid to a trusted server, associate it with the bidder, and show a clear success or error state.
6. Let the bidder review their submitted bids and contact details; explain how to request account or personal data deletion.

## Implementation outline

- Select and configure an authentication provider and backend before implementation. Keep provider credentials and secrets out of client-side code.
- Add an auth boundary around bid submission, rather than around public browsing.
- Store only the minimum bidder profile data needed to operate auctions, with explicit consent for auction-related contact.
- Enforce bid ownership and authorization on the server. Never treat client-side state as proof of identity or as the authoritative bid record.
- Define session expiration, sign-out, account recovery, and email-change behavior.
- Add accessible loading, validation, verification, and failure states to the sign-in and bid confirmation screens.

## Decisions to make

- Which authentication provider and backend will own accounts and bids?
- Is email verification sufficient, or is a stronger identity check required for binding bids?
- What bidder fields are needed for auction operations, and how long should they be retained?
- What are the account deletion and privacy-request processes?

## Completion criteria

- Public pages remain accessible without signing in.
- A bid cannot be accepted without a verified bidder identity and server-side authorization.
- Bids persist across reloads and are visible only to their owner and authorized site operators.
- Sign-in, recovery, sign-out, verification, and bid submission have usable success and error states.
- Privacy, retention, and account deletion behavior is documented before launch.
