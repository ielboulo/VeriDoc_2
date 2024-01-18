use anchor_lang::prelude::*;

declare_id!("Your program ID here");

// Define the state of the signed document
#[derive(Accounts)]
pub struct SignedDocument<'info> {
    #[account(mut, signer)]
    pub signer_account: AccountInfo<'info>,
    #[account(mut)]
    pub document_account: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
}

// Define the instruction types that the program can accept
#[derive(Accounts)]
pub struct VeriDoc<'info> {
    #[account(mut, signer)]
    pub signer_account: AccountInfo<'info>,
    #[account(mut)]
    pub document_account: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
    pub clock: Sysvar<'info, Clock>,
    #[account(init)]
    pub data: ProgramAccount<'info, SignedDocument<'info>>,
    #[account(signer)]
    pub authority: AccountInfo<'info>,
}

impl<'info> VeriDoc<'info> {
    pub fn sign_document(&mut self, hash: String) -> ProgramResult {
        // Verify that the signer account has signed the transaction
        if !self.signer_account.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        // Get the current timestamp
        let timestamp = self.clock.unix_timestamp;

        // Update the document data
        self.data.hash = hash;
        self.data.signer_pubkey = *self.signer_account.key;
        self.data.timestamp = timestamp;

        Ok(())
    }

    pub fn verify_document(&self, hash: String) -> ProgramResult {
        // Compare the provided hash with the stored hash
        if self.data.hash == hash {
            msg!("Document hash matches. Verification successful.");
        } else {
            msg!("Document hash does not match. Verification failed.");
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + SignedDocument::LEN)]
    pub data: ProgramAccount<'info, SignedDocument<'info>>,
    #[account(signer)]
    pub authority: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
}

impl<'info> Initialize<'info> {
    pub fn initialize(&mut self) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Close<'info> {
    #[account(mut, close = authority)]
    pub data: ProgramAccount<'info, SignedDocument<'info>>,
    pub authority: AccountInfo<'info>,
}

impl<'info> Close<'info> {
    pub fn close(&mut self) -> ProgramResult {
        Ok(())
    }
}
