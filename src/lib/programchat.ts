import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from './firebase'
import { useDoc } from "./useFirebase";
import { createUser } from "./user";


// export interface ProgramCh